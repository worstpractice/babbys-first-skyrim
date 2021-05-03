import { Quaternion } from "three";
import { input } from "../input/input";
import { player } from "../player/player";
import { vec3 } from "../utils/vec3";

const TO_THE_LEFT = Math.PI;
const TO_THE_RIGHT = -Math.PI;

export const turn = (deltaInSeconds: number) => {
  if (!player.activeEffects.has("turning")) return;

  const turnQuaternion = new Quaternion();
  const axisAngle = vec3(0, 1, 0);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Turn Left *
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (input.heldKeys.has("KeyA")) {
    const angle = TO_THE_LEFT * deltaInSeconds * player.physics.acceleration.y;

    turnQuaternion.setFromAxisAngle(axisAngle, angle);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Turn Right *
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (input.heldKeys.has("KeyD")) {
    const angle = TO_THE_RIGHT * deltaInSeconds * player.physics.acceleration.y;

    turnQuaternion.setFromAxisAngle(axisAngle, angle);
  }

  // Apply it
  player.model.quaternion.multiply(turnQuaternion);
};
