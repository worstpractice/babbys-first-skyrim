import type { Actions } from 'src/game/typings/Actions';
import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';
import type { Player } from 'src/game/typings/Player';

export const createActions = (player: Player): Actions => {
  /////////////////////////////////////////////////////////////////////////////
  // * Attacking *
  /////////////////////////////////////////////////////////////////////////////
  const startAttacking = (): void => {
    const isUsing = player.activeEffects.has('using');

    if (!isUsing) return;

    player.activeAnimations.add('attacking');
  };

  const stopAttacking = (): void => {
    player.activeAnimations.delete('attacking');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Idling *
  /////////////////////////////////////////////////////////////////////////////
  const startIdling = (): void => {
    if (player.activeEffects.size) return;

    player.activeAnimations.add('idling');
  };

  const stopIdling = (): void => {
    player.activeAnimations.delete('idling');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Jumping *
  /////////////////////////////////////////////////////////////////////////////
  const startJumping = (): void => {
    const hasNothingToPushOffAgainst = player.activeEffects.has('levitating');

    if (hasNothingToPushOffAgainst) return;

    player.activeAnimations.add('jumping');
  };

  const stopJumping = (): void => {
    player.activeAnimations.delete('jumping');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Running *
  /////////////////////////////////////////////////////////////////////////////
  const startRunning = (): void => {
    const isMoving = player.activeEffects.has('moving');

    if (!isMoving) return;

    player.activeAnimations.add('running');
  };

  const stopRunning = (): void => {
    player.activeAnimations.delete('running');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Walking *
  /////////////////////////////////////////////////////////////////////////////
  const startWalking = (): void => {
    const isMoving = player.activeEffects.has('moving');

    if (!isMoving) return;

    player.activeAnimations.add('walking');
  };

  const stopWalking = (): void => {
    player.activeAnimations.delete('walking');
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

    player.mixer.removeEventListener('finished', stopJumping);
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
