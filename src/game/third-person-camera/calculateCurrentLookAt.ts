import { vec3 } from 'src/game/utils/vec3';
import type { PerspectiveCamera, Vector3 } from 'three';

export const calculateCurrentLookAt = (camera: PerspectiveCamera): Vector3 => {
  return camera.getWorldDirection(vec3()).add(camera.position);
};
