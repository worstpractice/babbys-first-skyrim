import { input } from "../input/input";
import { player } from "../player/player";
import { vec3 } from "../utils/vec3";

export const move = (deltaInSeconds: number) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Move Forward *
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (input.heldKeys.has("KeyW")) {
    const acceleration = input.heldModifierKeys.has("ShiftLeft") ? player.physics.acceleration.z * 3 : player.physics.acceleration.z;

    player.physics.velocity.z += acceleration * deltaInSeconds;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Move Backward *
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (input.heldKeys.has("KeyS")) {
    player.physics.velocity.z -= player.physics.acceleration.z * deltaInSeconds;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Apply Motion? *
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const forward = vec3(0, 0, 1);
  forward.applyQuaternion(player.model.quaternion);
  forward.normalize();

  forward.multiplyScalar(player.physics.velocity.z * deltaInSeconds);

  player.model.position.add(forward);
};
