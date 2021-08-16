import { startJumping, stopJumping } from 'src/game/cascade/animations/jumping';
import { startMoving, stopMoving } from 'src/game/cascade/effects/moving';
import { startTurning, stopTurning } from 'src/game/cascade/effects/turning';
import { startUsing, stopUsing } from 'src/game/cascade/effects/using';

import { player } from 'src/game/player/player';
import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';
import type { AnimationMixerListener } from 'src/game/typings/AnimationMixerListener';
import type { Input } from 'src/game/typings/Input';

const stopJumpingAndCleanUp = ({ action }: AnimationMixerEvent): void => {
  const clip = action.getClip();

  if (clip.name !== 'jumpingClip') return;

  stopJumping();

  player.mixer.removeEventListener('finished', stopJumping);
};

export const mapKeysToEffects = (input: Input): void => {
  //////////////////////////////////////////////////////////////////////
  // * Moving *
  //////////////////////////////////////////////////////////////////////
  input.heldMovementKeys.on('add', (): void => {
    const isTreadingWater = input.heldMovementKeys.hasAllOf('KeyS', 'KeyW');

    if (isTreadingWater) {
      stopMoving();
    } else {
      startMoving(input);
    }
  });

  input.heldMovementKeys.on('delete', (): void => {
    const isTreadingWater = input.heldMovementKeys.hasAllOf('KeyS', 'KeyW');

    if (!isTreadingWater) {
      startMoving(input);
    }
  });

  input.heldMovementKeys.on('empty', stopMoving);

  //////////////////////////////////////////////////////////////////////
  // * Turning *
  //////////////////////////////////////////////////////////////////////
  input.heldActionKeys.on('add', ({ value }): void => {
    const isTurning = value === 'KeyD' || value === 'KeyA';

    if (!isTurning) return;

    const isTreadingWater = input.heldActionKeys.hasAllOf('KeyA', 'KeyD');

    if (isTreadingWater) {
      stopTurning();
      input.heldActionKeys.once('delete', ({ value }): void => {
        const isTurning = value === 'KeyD' || value === 'KeyA';

        if (!isTurning) return;

        startTurning(input);
      });
    } else {
      startTurning(input);
    }
  });

  //////////////////////////////////////////////////////////////////////
  // * Jumping *
  //////////////////////////////////////////////////////////////////////
  input.heldActionKeys.on('add', 'Space', (): void => {
    (player.mixer.addEventListener as AnimationMixerListener)('finished', stopJumpingAndCleanUp);

    startJumping();
  });

  //////////////////////////////////////////////////////////////////////
  // * Attacking *
  //////////////////////////////////////////////////////////////////////
  input.heldMouseButtons.on('add', 'LMB', (): void => {
    startUsing();

    input.heldMouseButtons.once('delete', 'LMB', stopUsing);
  });
};
