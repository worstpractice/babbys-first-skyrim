import type { GameObject } from 'src/engine/GameObject';
import type { Light } from 'three';

export type Constructors = {
  readonly gameObjects: readonly (() => GameObject)[];
  readonly lights: readonly (() => Light)[];
};
