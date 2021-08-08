import { PASSIVE } from "../../constants/event-listener-options/PASSIVE";
import { handleKeyDown } from "../handlers/handleKeyDown";
import { handleKeyUp } from "../handlers/handleKeyUp";
import { handleMouseDown } from "../handlers/handleMouseDown";
import { handleMouseUp } from "../handlers/handleMouseUp";
import { handleResize } from "../handlers/handleResize";

export const registerEventListeners = (): void => {
  window.addEventListener("keydown", handleKeyDown, PASSIVE);
  window.addEventListener("keyup", handleKeyUp, PASSIVE);
  window.addEventListener("resize", handleResize, PASSIVE);
  window.addEventListener("mousedown", handleMouseDown, PASSIVE);
  window.addEventListener("mouseup", handleMouseUp, PASSIVE);
};
