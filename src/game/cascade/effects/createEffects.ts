import type { Effects } from 'src/game/typings/Effects';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';

export const createEffects = ({ heldKeys, heldMovementKeys }: Input, { activeEffects }: Player): Effects => {
  /////////////////////////////////////////////////////////////////////////////
  // * Levitating *
  /////////////////////////////////////////////////////////////////////////////
  const startLevitating = (): void => {
    activeEffects.add('levitating');
  };

  const stopLevitating = (): void => {
    activeEffects.delete('levitating');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Moving *
  /////////////////////////////////////////////////////////////////////////////
  const startMoving = (): void => {
    const isPlayerMoving = Boolean(heldMovementKeys.size);

    if (!isPlayerMoving) return;

    activeEffects.add('moving');
  };

  const stopMoving = (): void => {
    activeEffects.delete('moving');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Turning *
  /////////////////////////////////////////////////////////////////////////////
  const startTurning = (): void => {
    const isPlayerTurning = heldKeys.hasSome('KeyA', 'KeyD');

    if (!isPlayerTurning) return;

    activeEffects.add('turning');
  };

  const stopTurning = (): void => {
    activeEffects.delete('turning');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Using *
  /////////////////////////////////////////////////////////////////////////////
  const startUsing = () => {
    activeEffects.add('using');
  };

  const stopUsing = () => {
    activeEffects.delete('using');
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
