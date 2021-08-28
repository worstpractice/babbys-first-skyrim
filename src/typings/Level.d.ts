import type { World } from 'cannon-es';
import type { ObSet } from 'obset';
import type { Thing } from 'src/game/typings/Thing';
import type { Scene } from 'three';

export type Level = {
  readonly scene: Scene;
  readonly world: World;
  readonly things: ObSet<Thing>;
};
