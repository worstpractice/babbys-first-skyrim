import type { Actor } from 'src/game/typings/Actor';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import type { PerspectiveCamera } from 'three';

type Props = {
  readonly actor: Actor;
  readonly camera: PerspectiveCamera;
  readonly input: Input;
};

export const createPlayer = async ({ actor, camera, input }: Props): Promise<Player> => {
  return {
    actor,
    camera,
    input,
  } as const;
};
