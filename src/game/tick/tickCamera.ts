import { camera } from "src/game/engine/camera";
import { calculateFrameRateIndependentLerpCoefficient } from "src/game/third-person-camera/calculateFrameRateIndependentLerpCoefficient";
import { calculateIdealFrom } from "src/game/third-person-camera/calculateIdealFrom";
import { getCurrentCameraLookAt } from "src/game/third-person-camera/getCurrentCameraLookAt";
import { vec3 } from "src/game/utils/vec3";
import type { Vector3 } from "three";

export const tickCamera = (deltaInSeconds: number): void => {
  /** NOTE: places the camera a little bit behind the player and above their shoulder. */
  const baseOffset: Vector3 = vec3(-15, 20, -15);

  /** NOTE: an offset placed ahead of the character (in local space). */
  const baseLookAt: Vector3 = vec3(0, 10, 50);

  const newOffset: Vector3 = calculateIdealFrom(baseOffset);
  const newLookAt: Vector3 = calculateIdealFrom(baseLookAt);

  const t = calculateFrameRateIndependentLerpCoefficient(deltaInSeconds);

  const oldOffset = camera.position.clone();
  const oldLookAt = getCurrentCameraLookAt();

  camera.position.copy(oldOffset.lerp(newOffset, t));
  camera.lookAt(oldLookAt.lerp(newLookAt, t));
};
