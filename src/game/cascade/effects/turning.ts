import { player } from 'src/game/player/player';
import type { Input } from 'src/game/typings/Input';

export const startTurning = (input: Input): void => {
  const isPlayerTurning = input.heldKeys.hasAnyOf('KeyA', 'KeyD');

  if (!isPlayerTurning) return;

  player.activeEffects.add('turning');
};

export const stopTurning = (): void => {
  player.activeEffects.delete('turning');
};
