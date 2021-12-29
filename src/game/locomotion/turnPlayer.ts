import type { Actor } from 'src/game/typings/Actor';
import type { Input } from 'src/game/typings/Input';

export const turnPlayer = (deltaInSeconds: number, input: Input, player: Actor): void => {
  if (!player.effects.has('turning')) return;

  // prettier-ignore
  const y = input.heldKeys.has('KeyA')
    ? 1
    : -1;

  player.body.quaternion.y += y * 0.01;
};
