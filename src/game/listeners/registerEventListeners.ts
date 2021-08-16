import { PASSIVE } from 'src/constants/event-listener-options/PASSIVE';
import { createHandleKeydown } from 'src/game/handlers/createHandleKeyDown';
import { createHandleKeyUp } from 'src/game/handlers/createHandleKeyUp';
import { createHandleMouseDown } from 'src/game/handlers/createHandleMouseDown';
import { createHandleMouseUp } from 'src/game/handlers/createHandleMouseUp';
import { createHandleResize } from 'src/game/handlers/createHandleResize';
import type { Input } from 'src/game/typings/Input';
import type { PerspectiveCamera, WebGLRenderer } from 'three';

type Props = {
  readonly camera: PerspectiveCamera;
  readonly input: Input;
  readonly renderer: WebGLRenderer;
};

export const registerEventListeners = ({ camera, input, renderer }: Props): void => {
  const handleKeyDown = createHandleKeydown(input);
  const handleKeyUp = createHandleKeyUp(input);
  const handleMouseDown = createHandleMouseDown(input, renderer);
  const handleMouseUp = createHandleMouseUp(input, renderer);
  const handleResize = createHandleResize(camera, renderer);

  window.addEventListener('keydown', handleKeyDown, PASSIVE);
  window.addEventListener('keyup', handleKeyUp, PASSIVE);
  window.addEventListener('mousedown', handleMouseDown, PASSIVE);
  window.addEventListener('mouseup', handleMouseUp, PASSIVE);
  window.addEventListener('resize', handleResize, PASSIVE);
};
