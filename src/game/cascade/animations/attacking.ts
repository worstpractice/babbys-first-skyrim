import { player } from 'src/game/player/player';

export const startAttacking = (): void => {
  const isUsing = player.activeEffects.has('using');

  if (!isUsing) return;

  player.activeAnimations.add('attacking');
};

export const stopAttacking = (): void => {
  player.activeAnimations.delete('attacking');
};
