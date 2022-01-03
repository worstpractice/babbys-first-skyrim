import 'modern-normalize';
import { default as React, StrictMode } from 'react';
import { render } from 'react-dom';
import { GameLoop } from 'src/engine/GameLoop';
import { GAME_OBJECTS } from 'src/engine/globals/GAME_OBJECTS';
import { LOADING_MANAGER } from 'src/engine/globals/LOADING_MANAGER';
import { Ground } from 'src/game/lib/Ground';
import { Pawn } from 'src/game/lib/Pawn';
import { Sphere } from 'src/game/lib/Sphere';
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
// * Random Loading Function Ok I Guess *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const loadNameClipDuos = async () => {
  const mesh = await loadKnightModel({ loadingManager: LOADING_MANAGER });

  const promises = [
    //
    loadKnightAnimations(LOADING_MANAGER),
    loadWeaponModel(LOADING_MANAGER, mesh),
  ] as const;

  // Run in parallell, but purposefully ignore the 2nd result (which is void)
  const [nameClipDuos] = await Promise.all(promises);

  return [mesh, nameClipDuos] as const;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * What It Says On The Tin 🤢 *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const instantiateStuffAsASideEffect = async (): Promise<void> => {
  const constructors = [
    //
    () => new Ground(),
    async () => new Pawn(...(await loadNameClipDuos())),
    async () => new Pawn(...(await loadNameClipDuos())),
    async () => new Pawn(...(await loadNameClipDuos())),
    () => new Sphere(),
    () => new Sphere(),
    () => new Sphere(),
    () => new Sphere(),
    () => new Sphere(),
    () => new Sphere(),
    () => new Sphere(),
  ] as const;

  for (const constructor of constructors) {
    await constructor();
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * And This Is Where The Magic Happens *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const startGame = async (): Promise<void> => {
  await instantiateStuffAsASideEffect();

  console.time('boot game');
  const game = new GameLoop();
  console.timeEnd('boot game');

  console.log(game);

  const { inventory } = [...GAME_OBJECTS].find((go) => go instanceof Pawn) as Pawn;

  console.time('render');
  render(
    <StrictMode>
      <GameUi inventory={inventory} />
    </StrictMode>,
    document.querySelector('div'),
  );
  console.timeEnd('render');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Drumroll Please *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener(
  'load',
  startGame, // eslint-disable-line @typescript-eslint/no-misused-promises
  ONCE_PASSIVE,
);
