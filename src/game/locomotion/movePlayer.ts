import type { Input } from 'src/game/typings/Input';
import type { Actor } from 'src/game/typings/Actor';
import type { Vector3 } from 'three';

export const movePlayer = (deltaInSeconds: number, getCurrentCameraDirection: (this: void) => Vector3, input: Input, player: Actor) => {
  if (!player.effects.has('moving')) return;

  let { x, z } = getCurrentCameraDirection();

  if (input.heldModifierKeys.has('ShiftLeft')) {
    x *= 2;
    z *= 2;
  }

  if (input.heldKeys.has('KeyS')) {
    x = -x;
    z = -z;
  }

  player.body.position.x += x * 0.5;
  player.body.position.z += z * 0.5;
};
