import { startJumping, stopJumping } from 'src/game/cascade/animations/jumping';
import { startMoving, stopMoving } from 'src/game/cascade/effects/moving';
import { startTurning, stopTurning } from 'src/game/cascade/effects/turning';
import { startUsing, stopUsing } from 'src/game/cascade/effects/using';
import { input } from 'src/game/input/input';
import { player } from 'src/game/player/player';
import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';
import type { AnimationMixerListener } from 'src/game/typings/AnimationMixerListener';

const stopJumpingAndCleanUp = ({ action }: AnimationMixerEvent) => {
  const clip = action.getClip();

  if (clip.name !== 'jumpingClip') return;

  stopJumping();

  player.mixer.removeEventListener('finished', stopJumping);
};

export const mapKeysToEffects = (): void => {
  //////////////////////////////////////////////////////////////////////
  // * Moving *
  //////////////////////////////////////////////////////////////////////
  input.heldMovementKeys.on('add', () => {
    const isTreadingWater = input.heldMovementKeys.has('KeyS') && input.heldMovementKeys.has('KeyW');

    if (isTreadingWater) {
      stopMoving();
    } else {
      startMoving();
    }
  });

  input.heldMovementKeys.on('delete', () => {
    const isTreadingWater = input.heldMovementKeys.has('KeyS') && input.heldMovementKeys.has('KeyW');

    if (!isTreadingWater) {
      startMoving();
    }
  });

  input.heldMovementKeys.on('empty', stopMoving);

  //////////////////////////////////////////////////////////////////////
  // * Turning *
  //////////////////////////////////////////////////////////////////////
  input.heldActionKeys.on('add', ({ value }) => {
    const isTurning = value === 'KeyD' || value === 'KeyA';

    if (!isTurning) return;

    const isTreadingWater = input.heldActionKeys.has('KeyA') && input.heldActionKeys.has('KeyD');

    if (isTreadingWater) {
      stopTurning();
      input.heldActionKeys.once('delete', ({ value }) => {
        const isTurning = value === 'KeyD' || value === 'KeyA';

        if (!isTurning) return;

        startTurning();
      });
    } else {
      startTurning();
    }
  });

  //////////////////////////////////////////////////////////////////////
  // * Jumping *
  //////////////////////////////////////////////////////////////////////
  input.heldActionKeys.on('add', 'Space', () => {
    (player.mixer.addEventListener as AnimationMixerListener)('finished', stopJumpingAndCleanUp);

    startJumping();
  });

  //////////////////////////////////////////////////////////////////////
  // * Attacking *
  //////////////////////////////////////////////////////////////////////
  input.heldMouseButtons.on('add', 'LMB', () => {
    startUsing();

    input.heldMouseButtons.once('delete', 'LMB', stopUsing);
  });
};
