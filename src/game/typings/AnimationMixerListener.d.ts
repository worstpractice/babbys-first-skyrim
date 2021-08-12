import type { AnimationMixerEvent } from "src/game/typings/AnimationMixerEvent";

export type AnimationMixerListener = (type: AnimationMixerEvent["type"], cb: (event: AnimationMixerEvent) => void) => void;
