import { camera } from 'src/game/engine/camera';
import { vec3 } from 'src/game/utils/vec3';
import type { Vector3 } from 'three';

export const getCurrentCameraLookAt = (): Vector3 => {
  return camera.getWorldDirection(vec3()).add(camera.position);
};
