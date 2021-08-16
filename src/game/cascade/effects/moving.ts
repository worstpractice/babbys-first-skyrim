import { input } from 'src/game/input/input';
import { player } from 'src/game/player/player';

export const startMoving = (): void => {
  const isPlayerMoving = Boolean(input.heldMovementKeys.size);

  if (!isPlayerMoving) return;

  player.activeEffects.add('moving');
};

export const stopMoving = (): void => {
  player.activeEffects.delete('moving');
};
