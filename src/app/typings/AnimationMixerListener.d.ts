import type { AnimationMixerEvent } from "./AnimationMixerEvent";

export type AnimationMixerListener = (type: AnimationMixerEvent["type"], cb: (event: AnimationMixerEvent) => void) => void;
