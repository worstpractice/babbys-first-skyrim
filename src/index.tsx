import 'modern-normalize';
import { default as React, StrictMode } from 'react';
import { render } from 'react-dom';
import { main } from 'src/game/main';
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

const startGame = async (): Promise<void> => {
  console.time('boot game');
  const game = await main();
  console.timeEnd('boot game');

  console.log(game);

  console.time('render');
  render(
    <StrictMode>
      <GameUi game={game} />
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
