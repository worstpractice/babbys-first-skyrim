import { Vector3 } from 'three';

export const vec3 = (x = 0, y = 0, z = 0): Vector3 => {
  return new Vector3(x, y, z);
};
