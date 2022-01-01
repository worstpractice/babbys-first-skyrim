import type { World } from 'cannon-es';
import type { ObSet } from 'obset';
import type { GameObject } from 'src/game/typings/GameObject';
import type { Scene } from 'three';

export type Level = {
  readonly gameObjects: ObSet<GameObject>;
  readonly scene: Scene;
  readonly world: World;
};
