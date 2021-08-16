import { Quaternion } from 'three';

export const vec4 = (x = 0, y = 0, z = 0, w = 0): Quaternion => {
  return new Quaternion(x, y, z, w);
};
