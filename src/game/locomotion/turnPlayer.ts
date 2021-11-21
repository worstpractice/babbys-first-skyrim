import { TO_THE_LEFT } from 'src/game/constants/TO_THE_LEFT';
import { TO_THE_RIGHT } from 'src/game/constants/TO_THE_RIGHT';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';

export const turnPlayer = (deltaInSeconds: number, input: Input, player: Player): void => {
  if (!player.effects.has('turning')) return;

  const direction = input.heldKeys.has('KeyA') ? TO_THE_LEFT : TO_THE_RIGHT;

  const angle = direction * deltaInSeconds;

  const { x, y, z } = player.body.angularVelocity;

  player.body.angularVelocity.set(x, y + angle, z);
};
