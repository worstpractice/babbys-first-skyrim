import { input } from 'src/game/input/input';
import { player } from 'src/game/player/player';

export const startTurning = (): void => {
  const isPlayerTurning = input.heldKeys.hasAnyOf('KeyA', 'KeyD');

  if (!isPlayerTurning) return;

  player.activeEffects.add('turning');
};

export const stopTurning = (): void => {
  player.activeEffects.delete('turning');
};
