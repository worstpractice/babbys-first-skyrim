import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';

export type AnimationMixerListener = (this: void, type: AnimationMixerEvent['type'], cb: (this: void, event: AnimationMixerEvent) => void) => void;
