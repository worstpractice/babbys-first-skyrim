import type { Body } from 'cannon-es';
import type { GameObject } from 'src/engine/GameObject';
import type { Mesh } from 'three';

export type HasPhysics = {
  readonly body: Body;
  readonly mesh: Mesh;
};

export const hasPhysics = (t: GameObject): t is GameObject & HasPhysics => {
  return !!(t.body && t.mesh);
};
