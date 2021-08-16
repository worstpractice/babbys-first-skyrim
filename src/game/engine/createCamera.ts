import { PerspectiveCamera } from 'three';

const FOV = 90;

const NEAR = 1;

const FAR = 10_000;

export const createCamera = async () => {
  const ASPECT = window.innerWidth / window.innerHeight;

  const camera = new PerspectiveCamera(FOV, ASPECT, NEAR, FAR);

  camera.position.set(75, 20, 0);

  return camera;
};
