import 'modern-normalize';
import { default as React, StrictMode } from 'react';
import { render } from 'react-dom';
import { CAPTURE } from 'src/constants/event-listener-options/CAPTURE';
import { CAPTURE_PASSIVE } from 'src/constants/event-listener-options/CAPTURE_PASSIVE';
import { ONCE_PASSIVE } from 'src/constants/event-listener-options/ONCE_PASSIVE';
import { main } from 'src/game/main';
import { detectLongTasks } from 'src/game/utils/detectLongTasks';
import { GameUi } from 'src/GameUi';
import { closeMenusOnAttack } from 'src/handlers/closeMenusOnAttack';
import { disableSaveShortcut } from 'src/handlers/disableSaveShortcut';
import { handleHotkeys } from 'src/handlers/handleHotkeys';
import { toFalse } from 'src/utils/setters/toFalse';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Register Event Listeners *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
detectLongTasks();

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

const launch = async () => {
  console.time('boot game');
  const game = await main();
  console.timeEnd('boot game');

  const root = document.querySelector('div');

  render(
    <StrictMode>
      <GameUi game={game} />
    </StrictMode>,
    root,
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener(
  'DOMContentLoaded',
  launch, // eslint-disable-line @typescript-eslint/no-misused-promises
  ONCE_PASSIVE,
);
