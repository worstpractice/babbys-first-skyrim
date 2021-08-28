import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import type { Vector3 } from 'three';

export const movePlayer = (deltaInSeconds: number, getCurrentCameraDirection: (this: void) => Vector3, input: Input, player: Player) => {
  if (!player.activeEffects.has('moving')) return;

  const direction = input.heldKeys.has('KeyW') ? 25 : -25;

  const velocity = input.heldModifierKeys.has('ShiftLeft') ? direction * 2 : direction;

  const { x, z } = getCurrentCameraDirection();

  player.body.velocity.x = x * velocity;
  player.body.velocity.z = z * velocity;
};