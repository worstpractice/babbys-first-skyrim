import { player } from 'src/game/player/player';

export const startRunning = (): void => {
  const isMoving = player.activeEffects.has('moving');

  if (!isMoving) return;

  player.activeAnimations.add('running');
};

export const stopRunning = (): void => {
  player.activeAnimations.delete('running');
};
