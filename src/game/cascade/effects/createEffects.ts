import type { Effects } from 'src/game/typings/Effects';
import type { Player } from 'src/game/typings/Player';

export const createEffects = ({ activeEffects }: Player): Effects => {
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
    activeEffects.add('moving');
  };

  const stopMoving = (): void => {
    activeEffects.delete('moving');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Turning *
  /////////////////////////////////////////////////////////////////////////////
  const startTurning = (): void => {
    activeEffects.add('turning');
  };

  const stopTurning = (): void => {
    activeEffects.delete('turning');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Using *
  /////////////////////////////////////////////////////////////////////////////
  const startUsing = (): void => {
    activeEffects.add('using');
  };

  const stopUsing = (): void => {
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
