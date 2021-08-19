import type { Effects } from 'src/game/typings/Effects';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';

export const createEffects = (input: Input, player: Player): Effects => {
  /////////////////////////////////////////////////////////////////////////////
  // * Levitating *
  /////////////////////////////////////////////////////////////////////////////
  const startLevitating = (): void => {
    player.activeEffects.add('levitating');
  };

  const stopLevitating = (): void => {
    player.activeEffects.delete('levitating');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Moving *
  /////////////////////////////////////////////////////////////////////////////
  const startMoving = (): void => {
    const isPlayerMoving = Boolean(input.heldMovementKeys.size);

    if (!isPlayerMoving) return;

    player.activeEffects.add('moving');
  };

  const stopMoving = (): void => {
    player.activeEffects.delete('moving');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Turning *
  /////////////////////////////////////////////////////////////////////////////
  const startTurning = (): void => {
    const isPlayerTurning = input.heldKeys.hasSome('KeyA', 'KeyD');

    if (!isPlayerTurning) return;

    player.activeEffects.add('turning');
  };

  const stopTurning = (): void => {
    player.activeEffects.delete('turning');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Using *
  /////////////////////////////////////////////////////////////////////////////
  const startUsing = () => {
    player.activeEffects.add('using');
  };

  const stopUsing = () => {
    player.activeEffects.delete('using');
  };

  /////////////////////////////////////////////////////////////////////////////

  return {
    startLevitating,
    startMoving,
    startTurning,
    startUsing,
    stopLevitating,
    stopMoving,
    stopTurning,
    stopUsing,
  } as const;
};
