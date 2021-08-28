import type { Body } from 'cannon-es';
import type { Object3D } from 'three';

export type Thing = {
  readonly body: Body;
  readonly model: Object3D;
};
