import { PASSIVE } from 'src/constants/event-listener-options/PASSIVE';
import { handleKeyDown } from 'src/game/handlers/handleKeyDown';
import { handleKeyUp } from 'src/game/handlers/handleKeyUp';
import { handleMouseDown } from 'src/game/handlers/handleMouseDown';
import { handleMouseUp } from 'src/game/handlers/handleMouseUp';
import { handleResize } from 'src/game/handlers/handleResize';

export const registerEventListeners = async (): Promise<void> => {
  window.addEventListener('keydown', handleKeyDown, PASSIVE);
  window.addEventListener('keyup', handleKeyUp, PASSIVE);
  window.addEventListener('resize', handleResize, PASSIVE);
  window.addEventListener('mousedown', handleMouseDown, PASSIVE);
  window.addEventListener('mouseup', handleMouseUp, PASSIVE);
};
