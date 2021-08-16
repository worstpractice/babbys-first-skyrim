import { player } from 'src/game/player/player';

export const startWalking = (): void => {
  const isMoving = player.activeEffects.has('moving');

  if (!isMoving) return;

  player.activeAnimations.add('walking');
};

export const stopWalking = (): void => {
  player.activeAnimations.delete('walking');
};
