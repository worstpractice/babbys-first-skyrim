import { movePlayer } from 'src/game/locomotion/movePlayer';
import { turnPlayer } from 'src/game/locomotion/turnPlayer';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import type { Vector3 } from 'three';

export const tickLocomotion = (deltaInSeconds: number, getCurrentCameraDirection: (this: void) => Vector3, input: Input, player: Player): void => {
  movePlayer(deltaInSeconds, getCurrentCameraDirection, input, player);

  turnPlayer(deltaInSeconds, input, player);
};
