import type { Actions } from 'src/game/typings/Actions';
import type { AnimationMixerListener } from 'src/game/typings/AnimationMixerListener';
import type { Effects } from 'src/game/typings/Effects';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';

type Props = {
  readonly actions: Actions;
  readonly effects: Effects;
  readonly input: Input;
  readonly player: Player;
};

export const mapKeysToEffects = ({ actions, effects, input, player }: Props): void => {
  const {
    //
    startJumping,
    stopJumpingAndCleanUp,
  } = actions;

  const {
    //
    startMoving,
    startTurning,
    startUsing,
    stopMoving,
    stopTurning,
    stopUsing,
  } = effects;

  //////////////////////////////////////////////////////////////////////
  // * Moving *
  //////////////////////////////////////////////////////////////////////
  input.heldMovementKeys.on('add', (): void => {
    const isTreadingWater = input.heldMovementKeys.hasEvery('KeyS', 'KeyW');

    if (isTreadingWater) {
      stopMoving();
    } else {
      startMoving();
    }
  });

  input.heldMovementKeys.on('delete', (): void => {
    const isTreadingWater = input.heldMovementKeys.hasEvery('KeyS', 'KeyW');

    if (!isTreadingWater) {
      startMoving();
    }
  });

  input.heldMovementKeys.on('empty', stopMoving);

  //////////////////////////////////////////////////////////////////////
  // * Turning *
  //////////////////////////////////////////////////////////////////////
  input.heldActionKeys.on('add', ({ value }): void => {
    const isTurning = value === 'KeyD' || value === 'KeyA';

    if (!isTurning) return;

    const isTreadingWater = input.heldActionKeys.hasEvery('KeyA', 'KeyD');

    if (isTreadingWater) {
      stopTurning();
      input.heldActionKeys.once('delete', ({ value }): void => {
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
