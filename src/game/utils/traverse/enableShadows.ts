import type { Object3D } from 'three';

export const enableShadows = (object3d: Object3D): void => {
  object3d.castShadow = true;
  object3d.receiveShadow = true;
};
