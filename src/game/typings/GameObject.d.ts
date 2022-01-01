import type { Body } from 'cannon-es';
import type { Object3D } from 'three';

export type GameObject = {
  readonly body: Body;
  readonly mesh: Object3D;
};
