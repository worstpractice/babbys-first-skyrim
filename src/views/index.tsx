import 'modern-normalize';
import { default as React, StrictMode } from 'react';
import { render } from 'react-dom';
import type { Constructors } from 'src/engine/GameEngine';
import { GameLoop } from 'src/engine/GameLoop';
import { GameObject } from 'src/engine/GameObject';
import { Ground } from 'src/game/lib/Ground';
import { Pawn } from 'src/game/lib/Pawn';
import { Sphere } from 'src/game/lib/Sphere';
import { createAmbientLight } from 'src/game/lights/createAmbientLight';
import { createDirectionalLight } from 'src/game/lights/createDirectionalLight';
import { loadKnightAnimations } from 'src/game/loading/loadKnightAnimations';
import { loadKnightModel } from 'src/game/loading/loadKnightModel';
import { loadWeaponModel } from 'src/game/loading/loadWeaponModel';
import { CAPTURE } from 'src/views/constants/event-listener-options/CAPTURE';
import { CAPTURE_PASSIVE } from 'src/views/constants/event-listener-options/CAPTURE_PASSIVE';
import { ONCE_PASSIVE } from 'src/views/constants/event-listener-options/ONCE_PASSIVE';
import { GameUi } from 'src/views/GameUi';
import { closeMenusOnAttack } from 'src/views/handlers/closeMenusOnAttack';
import { disableSaveShortcut } from 'src/views/handlers/disableSaveShortcut';
import { handleHotkeys } from 'src/views/handlers/handleHotkeys';
import { toFalse } from 'src/views/utils/setters/toFalse';
import { LoadingManager } from 'three';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Register Event Listeners *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** NOTE: DX improvement. */
window.addEventListener('keydown', disableSaveShortcut, CAPTURE);
window.addEventListener('keydown', handleHotkeys, CAPTURE_PASSIVE);

/** NOTE: disables context menu. */
window.oncontextmenu = toFalse;

/**
 * NOTE: disables kinda useless HTML Drag events, in favor of regular mouse events.
 *
 * See: https://javascript.info/mouse-drag-and-drop
 */
window.ondrag = toFalse;
window.ondragend = toFalse;
window.ondragenter = toFalse;
window.ondragleave = toFalse;
window.ondragover = toFalse;
window.ondragstart = toFalse;

window.addEventListener('mousedown', closeMenusOnAttack, CAPTURE_PASSIVE);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const loadNameClipDuos = async ({ loadingManager }: { readonly loadingManager: LoadingManager }) => {
  const mesh = await loadKnightModel({ loadingManager });

  const promises = [
    //
    loadKnightAnimations(loadingManager),
    loadWeaponModel(loadingManager, mesh),
  ] as const;

  // Run in parallell, but purposefully ignore the 2nd result (which is void)
  const [nameClipDuos] = await Promise.all(promises);

  return [mesh, nameClipDuos] as const;
};

const launch = async () => {
  const root = document.querySelector('div');

  if (!root) throw new ReferenceError('Missing root!');

  const loadingManager = new LoadingManager(console.log, console.debug, console.error);

  const pawnDeps1 = await loadNameClipDuos({ loadingManager });
  const pawnDeps2 = await loadNameClipDuos({ loadingManager });

  const constructors: Constructors = {
    gameObjects: [
      //
      () => new Ground(),
      () => new Pawn(...pawnDeps1),
      () => new Pawn(...pawnDeps2),
      ...(new Array(10).fill(() => new Sphere()) as readonly (() => Sphere)[]),
    ],
    lights: [
      //
      createAmbientLight,
      createDirectionalLight,
    ],
  } as const;

  const stuff = constructors.gameObjects.map((fn) => fn());

  console.time('boot game');
  const game = new GameLoop(loadingManager);

  /////////////////////////////////////////////////////////////////////////////
  // * Lights *
  /////////////////////////////////////////////////////////////////////////////
  for (const constructor of constructors.lights) {
    const light = constructor();

    game.scene.add(light);
  }
  /////////////////////////////////////////////////////////////////////////////

  console.timeEnd('boot game');

  const { inventory } = ([...GameObject.instances] as const).find((go) => go instanceof Pawn) as Pawn;

  render(
    <StrictMode>
      <GameUi inventory={inventory} />
    </StrictMode>,
    root,
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener(
  'load',
  launch, // eslint-disable-line @typescript-eslint/no-misused-promises
  ONCE_PASSIVE,
);
