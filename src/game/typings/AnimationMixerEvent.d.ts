import type { AnimationAction, AnimationMixer } from 'three';

export type AnimationMixerEvent = {
  action: AnimationAction;
  direction: number;
  target: AnimationMixer;
  type: 'finished' | 'loop';
};
