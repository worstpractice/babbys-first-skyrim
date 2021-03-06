import type { Actor } from 'src/game/typings/Actor';
import type { Input } from 'src/game/typings/Input';
import type { PerspectiveCamera } from 'three';

export type Player = {
  readonly actor: Actor;
  readonly camera: PerspectiveCamera;
  readonly input: Input;
};
