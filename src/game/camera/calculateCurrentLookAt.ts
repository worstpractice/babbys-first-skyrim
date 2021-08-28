import type { PerspectiveCamera } from 'three';
import { Vector3 } from 'three';

export const calculateCurrentLookAt = (camera: PerspectiveCamera): Vector3 => {
  return camera.getWorldDirection(new Vector3(0, 0, 0)).add(camera.position);
};
