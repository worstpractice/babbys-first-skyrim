import { player } from 'src/game/player/player';
import type { Input } from 'src/game/typings/Input';

export const startMoving = (input: Input): void => {
  const isPlayerMoving = Boolean(input.heldMovementKeys.size);

  if (!isPlayerMoving) return;

  player.activeEffects.add('moving');
};

export const stopMoving = (): void => {
  player.activeEffects.delete('moving');
};
