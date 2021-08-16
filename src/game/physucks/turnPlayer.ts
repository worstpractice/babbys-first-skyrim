import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import { vec3 } from 'src/game/utils/vec3';
import { Quaternion } from 'three';

const TO_THE_LEFT = Math.PI;
const TO_THE_RIGHT = -Math.PI;

export const turnPlayer = (deltaInSeconds: number, input: Input, player: Player): void => {
  if (!player.activeEffects.has('turning')) return;

  const turnQuaternion = new Quaternion();
  const axisAngle = vec3(0, 1, 0);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Turn Left *
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (input.heldKeys.has('KeyA')) {
    const angle = TO_THE_LEFT * deltaInSeconds * player.physics.acceleration.y;

    turnQuaternion.setFromAxisAngle(axisAngle, angle);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Turn Right *
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (input.heldKeys.has('KeyD')) {
    const angle = TO_THE_RIGHT * deltaInSeconds * player.physics.acceleration.y;

    turnQuaternion.setFromAxisAngle(axisAngle, angle);
  }

  // Apply it
  player.model.quaternion.multiply(turnQuaternion);
};
