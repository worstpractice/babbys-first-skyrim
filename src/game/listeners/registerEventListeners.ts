import { PASSIVE } from "src/constants/event-listener-options/PASSIVE";
import { handleKeyDown } from "src/handlers/handleKeyDown";
import { handleKeyUp } from "src/handlers/handleKeyUp";
import { handleMouseDown } from "src/handlers/handleMouseDown";
import { handleMouseUp } from "src/handlers/handleMouseUp";
import { handleResize } from "src/handlers/handleResize";

export const registerEventListeners = (): void => {
  window.addEventListener("keydown", handleKeyDown, PASSIVE);
  window.addEventListener("keyup", handleKeyUp, PASSIVE);
  window.addEventListener("resize", handleResize, PASSIVE);
  window.addEventListener("mousedown", handleMouseDown, PASSIVE);
  window.addEventListener("mouseup", handleMouseUp, PASSIVE);
};
