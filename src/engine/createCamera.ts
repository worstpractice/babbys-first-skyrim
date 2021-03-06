import { CAMERA_FAR } from 'src/game/constants/CAMERA_FAR';
import { CAMERA_FOV } from 'src/game/constants/CAMERA_FOV';
import { CAMERA_NEAR } from 'src/game/constants/CAMERA_NEAR';
import { PerspectiveCamera } from 'three';

export const createCamera = (): PerspectiveCamera => {
  const ASPECT = window.innerWidth / window.innerHeight;

  const camera = new PerspectiveCamera(CAMERA_FOV, ASPECT, CAMERA_NEAR, CAMERA_FAR);

  camera.position.set(0, 33, 90);

  return camera;
};
