import { GameObject } from 'src/engine/GameObject';
import type { AnimationMixer } from 'three';

export abstract class GameActor extends GameObject {
  abstract readonly mixer: AnimationMixer;
}
