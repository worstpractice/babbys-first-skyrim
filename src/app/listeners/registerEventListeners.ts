import { handleKeyDown } from "../handlers/handleKeyDown";
import { handleKeyUp } from "../handlers/handleKeyUp";
import { handleMouseDown } from "../handlers/handleMouseDown";
import { handleMouseUp } from "../handlers/handleMouseUp";
import { handleResize } from "../handlers/handleResize";

export const registerEventListeners = (): void => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("resize", handleResize);
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);
};
