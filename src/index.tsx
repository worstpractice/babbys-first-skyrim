import 'modern-normalize';
import { default as React, StrictMode } from 'react';
import { render } from 'react-dom';
import { CAPTURE } from 'src/constants/event-listener-options/CAPTURE';
import { CAPTURE_PASSIVE } from 'src/constants/event-listener-options/CAPTURE_PASSIVE';
import 'src/game';
import { closeMenusOnAttack } from 'src/handlers/closeMenusOnAttack';
import { disableSaveShortcut } from 'src/handlers/disableSaveShortcut';
import { handleHotkeys } from 'src/handlers/handleHotkeys';
import { Ui } from 'src/Ui';
import { toFalse } from 'src/utils/state-setters/toFalse';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Register Event Listeners *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** NOTE: DX improvement. */
window.addEventListener('keydown', disableSaveShortcut, CAPTURE);

window.addEventListener('keydown', handleHotkeys, CAPTURE_PASSIVE);

/** NOTE: disables context menu. */
window.oncontextmenu = toFalse;

/** NOTE: disables kinda useless HTML Drag events, in favor of regular mouse events.
 *
 * See: https://javascript.info/mouse-drag-and-drop */
window.ondrag = toFalse;
window.ondragend = toFalse;
window.ondragenter = toFalse;
window.ondragleave = toFalse;
window.ondragover = toFalse;
window.ondragstart = toFalse;

window.addEventListener('mousedown', closeMenusOnAttack, CAPTURE_PASSIVE);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const root = document.querySelector('div');

render(
  <StrictMode>
    <Ui />
  </StrictMode>,
  root,
);
