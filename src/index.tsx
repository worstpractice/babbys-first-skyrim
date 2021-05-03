import "normalize.css";
import { default as React, StrictMode } from "react";
import { render } from "react-dom";
import "./app";
import { closeMenusOnAttack } from "./handlers/closeMenusOnAttack";
import { disableSaveShortcut } from "./handlers/disableSaveShortcut";
import { handleHotkeys } from "./handlers/handleHotkeys";
import { Ui } from "./Ui";
import { toFalse } from "./utils/state-setters/toFalse";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Register Event Listeners *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** NOTE: DX improvement. */
window.addEventListener("keydown", disableSaveShortcut, { capture: true });

window.addEventListener("keydown", handleHotkeys, { capture: true, passive: true });

/** NOTE: disables context menu. */
window.oncontextmenu = toFalse;

/** NOTE: disables kinda useless HTML Drag events, in favor of regular mouse events.
 *
 * See: https://javascript.info/mouse-drag-and-drop */
window.ondrag = toFalse;
window.ondragend = toFalse;
window.ondragenter = toFalse;
window.ondragexit = toFalse;
window.ondragleave = toFalse;
window.ondragover = toFalse;
window.ondragstart = toFalse;

window.addEventListener("mousedown", closeMenusOnAttack, { capture: true, passive: true });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const root = document.getElementById("root");

render(
  <StrictMode>
    <Ui />
  </StrictMode>,
  root,
);
