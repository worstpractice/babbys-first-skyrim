import { player } from 'src/game/player/player';

export const startJumping = (): void => {
  const hasNothingToPushOffAgainst = player.activeEffects.has('levitating');

  if (hasNothingToPushOffAgainst) return;

  player.activeAnimations.add('jumping');
};

export const stopJumping = (): void => {
  player.activeAnimations.delete('jumping');
};
