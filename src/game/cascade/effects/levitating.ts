import { player } from 'src/game/player/player';

export const startLevitating = (): void => {
  player.activeEffects.add('levitating');
};

export const stopLevitating = (): void => {
  player.activeEffects.delete('levitating');
};
