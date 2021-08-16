import { player } from 'src/game/player/player';

export const startIdling = (): void => {
  const isDoingSomething = Boolean(player.activeEffects.size);

  if (isDoingSomething) return;

  player.activeAnimations.add('idling');
};

export const stopIdling = (): void => {
  player.activeAnimations.delete('idling');
};
