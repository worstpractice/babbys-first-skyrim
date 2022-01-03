import { movePlayer } from 'src/game/locomotion/movePlayer';
import { turnPlayer } from 'src/game/locomotion/turnPlayer';
import type { Actor } from 'src/game/typings/Actor';
import type { Input } from 'src/game/typings/Input';
import type { Vector3 } from 'three';

export const tickLocomotion = (
  deltaInSeconds: number,
  getCurrentCameraDirection: (this: void) => Vector3,
  input: Input,
  player: Actor,
): void => {
  movePlayer(deltaInSeconds, getCurrentCameraDirection, input, player);

  turnPlayer(deltaInSeconds, input, player);
};
