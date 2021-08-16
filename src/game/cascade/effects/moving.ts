import { input } from 'src/game/input/input';
import { player } from 'src/game/player/player';

export const startMoving = () => {
  const isPlayerMoving = Boolean(input.heldMovementKeys.size);

  if (!isPlayerMoving) return;

  player.activeEffects.add('moving');
};

export const stopMoving = () => {
  player.activeEffects.delete('moving');
};
