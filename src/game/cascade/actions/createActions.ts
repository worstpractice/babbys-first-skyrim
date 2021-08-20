import type { Actions } from 'src/game/typings/Actions';
import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';
import type { Player } from 'src/game/typings/Player';

export const createActions = ({ activeAnimations, activeEffects, mixer }: Player): Actions => {
  /////////////////////////////////////////////////////////////////////////////
  // * Attacking *
  /////////////////////////////////////////////////////////////////////////////
  const startAttacking = (): void => {
    const isUsing = activeEffects.has('using');

    if (!isUsing) return;

    activeAnimations.add('attacking');
  };

  const stopAttacking = (): void => {
    activeAnimations.delete('attacking');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Idling *
  /////////////////////////////////////////////////////////////////////////////
  const startIdling = (): void => {
    if (activeEffects.size) return;

    activeAnimations.add('idling');
  };

  const stopIdling = (): void => {
    activeAnimations.delete('idling');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Jumping *
  /////////////////////////////////////////////////////////////////////////////
  const startJumping = (): void => {
    const hasNothingToPushOffAgainst = activeEffects.has('levitating');

    if (hasNothingToPushOffAgainst) return;

    activeAnimations.add('jumping');
  };

  const stopJumping = (): void => {
    activeAnimations.delete('jumping');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Running *
  /////////////////////////////////////////////////////////////////////////////
  const startRunning = (): void => {
    const isMoving = activeEffects.has('moving');

    if (!isMoving) return;

    activeAnimations.add('running');
  };

  const stopRunning = (): void => {
    activeAnimations.delete('running');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Walking *
  /////////////////////////////////////////////////////////////////////////////
  const startWalking = (): void => {
    const isMoving = activeEffects.has('moving');

    if (!isMoving) return;

    activeAnimations.add('walking');
  };

  const stopWalking = (): void => {
    activeAnimations.delete('walking');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Convenience Functions *
  /////////////////////////////////////////////////////////////////////////////
  const slowToWalk = (): void => {
    stopRunning();
    startWalking();
  };

  const quickenToRun = (): void => {
    stopWalking();
    startRunning();
  };

  const stopJumpingAndCleanUp = ({ action }: AnimationMixerEvent): void => {
    const clip = action.getClip();

    if (clip.name !== 'jumpingClip') return;

    stopJumping();

    mixer.removeEventListener('finished', stopJumping);
  };

  /////////////////////////////////////////////////////////////////////////////

  return {
    quickenToRun,
    slowToWalk,
    startAttacking,
    startIdling,
    startJumping,
    startRunning,
    startWalking,
    stopAttacking,
    stopIdling,
    stopJumping,
    stopJumpingAndCleanUp,
    stopRunning,
    stopWalking,
  } as const;
};
