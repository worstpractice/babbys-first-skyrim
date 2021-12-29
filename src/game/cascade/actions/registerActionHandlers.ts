import type { Actor } from 'src/game/typings/Actor';
import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';
import type { Actions } from 'src/game/typings/commands/Actions';

export const registerActionHandlers = ({ actions, effects, mixer }: Actor): Actions => {
  /////////////////////////////////////////////////////////////////////////////
  // * Attacking *
  /////////////////////////////////////////////////////////////////////////////
  const startAttacking = (): void => {
    const isUsing = effects.has('using');

    if (!isUsing) return;

    actions.add('attacking');
  };

  const stopAttacking = (): void => {
    actions.delete('attacking');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Idling *
  /////////////////////////////////////////////////////////////////////////////
  const startIdling = (): void => {
    if (effects.size) return;

    actions.add('idling');
  };

  const stopIdling = (): void => {
    actions.delete('idling');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Jumping *
  /////////////////////////////////////////////////////////////////////////////
  const startJumping = (): void => {
    const hasNothingToPushOffAgainst = effects.has('levitating');

    if (hasNothingToPushOffAgainst) return;

    actions.add('jumping');
  };

  const stopJumping = (): void => {
    actions.delete('jumping');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Running *
  /////////////////////////////////////////////////////////////////////////////
  const startRunning = (): void => {
    const isMoving = effects.has('moving');

    if (!isMoving) return;

    actions.add('running');
  };

  const stopRunning = (): void => {
    actions.delete('running');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Walking *
  /////////////////////////////////////////////////////////////////////////////
  const startWalking = (): void => {
    const isMoving = effects.has('moving');

    if (!isMoving) return;

    actions.add('walking');
  };

  const stopWalking = (): void => {
    actions.delete('walking');
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
