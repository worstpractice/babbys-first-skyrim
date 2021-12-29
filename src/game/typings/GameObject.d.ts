import type { Body } from 'cannon-es';
import type { Uuid } from 'src/game/typings/brands/Uuid';
import type { Object3D } from 'three';

export type GameObject = {
  readonly body: Body;
  readonly id: Uuid;
  readonly model: Object3D;
};
