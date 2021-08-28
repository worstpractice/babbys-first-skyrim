import type { Quaternion as CannonQuaternion } from 'cannon-es';
import type { Vec3 } from 'math/Vec3';
import type { Quaternion as ThreeQuaternion, Vector3 } from 'three';

export type Adapt<T> = T extends Vec3
  ? Vector3
  : T extends Vector3
  ? Vec3
  : T extends ThreeQuaternion
  ? CannonQuaternion
  : T extends CannonQuaternion
  ? ThreeQuaternion
  : never;
