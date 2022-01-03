import type { GameObject } from 'src/engine/GameObject';
import type { AnimationMixer } from 'three';

export type HasMixer = {
  readonly mixer: AnimationMixer;
};

export const hasMixer = (t: GameObject): t is GameObject & HasMixer => {
  return !!t.mixer;
};
