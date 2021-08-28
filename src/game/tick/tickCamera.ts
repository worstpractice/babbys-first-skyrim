import { calculateCurrentLookAt } from 'src/game/camera/calculateCurrentLookAt';
import { calculateFrameRateIndependentLerpCoefficient } from 'src/game/camera/calculateFrameRateIndependentLerpCoefficient';
import { calculateIdealFrom } from 'src/game/camera/calculateIdealFrom';
import type { Player } from 'src/game/typings/Player';
import type { PerspectiveCamera } from 'three';
import { Vector3 } from 'three';

export const tickCamera = (deltaInSeconds: number, camera: PerspectiveCamera, player: Player): void => {
  /** NOTE: places the camera a little bit behind the player and above their shoulder. */
  const baseOffset: Vector3 = new Vector3(-15, 20, -15);

  /** NOTE: an offset placed ahead of the character (in local space). */
  const baseLookAt: Vector3 = new Vector3(0, 10, 50);

  const newOffset: Vector3 = calculateIdealFrom(baseOffset, player);
  const newLookAt: Vector3 = calculateIdealFrom(baseLookAt, player);

  const t = calculateFrameRateIndependentLerpCoefficient(deltaInSeconds);

  const oldOffset = camera.position.clone();
  const oldLookAt = calculateCurrentLookAt(camera);

  camera.position.copy(oldOffset.lerp(newOffset, t));
  camera.lookAt(oldLookAt.lerp(newLookAt, t));
};
