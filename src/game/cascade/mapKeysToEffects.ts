import type { AnimationMixerListener } from 'src/game/typings/AnimationMixerListener';
import type { Actions } from 'src/game/typings/commands/Actions';
import type { Effects } from 'src/game/typings/commands/Effects';
import type { Player } from 'src/game/typings/Player';

type Props = {
  readonly actions: Actions;
  readonly effects: Effects;
  readonly player: Player;
};

export const mapKeysToEffects = ({ actions, effects, player }: Props): void => {
  const { actor, input } = player;

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

    isTreadingWater ? stopMoving() : startMoving();
  });

  input.heldMovementKeys.on('delete', (): void => {
    const isTreadingWater = input.heldMovementKeys.hasEvery('KeyS', 'KeyW');

    if (!isTreadingWater) startMoving();
  });

  input.heldMovementKeys.on('empty', stopMoving);

  //////////////////////////////////////////////////////////////////////
  // * Turning *
  //////////////////////////////////////////////////////////////////////
  const turn = (): void => {
    const isTurning = input.heldActionKeys.xor('KeyA', 'KeyD');

    isTurning ? startTurning() : stopTurning();
  };

  input.heldActionKeys.on('add', 'KeyA', turn);
  input.heldActionKeys.on('add', 'KeyD', turn);

  input.heldActionKeys.on('delete', 'KeyA', turn);
  input.heldActionKeys.on('delete', 'KeyD', turn);

  //////////////////////////////////////////////////////////////////////
  // * Jumping *
  //////////////////////////////////////////////////////////////////////
  input.heldActionKeys.on('add', 'Space', (): void => {
    (actor.mixer.addEventListener as AnimationMixerListener)('finished', stopJumpingAndCleanUp);

    startJumping();
  });

  //////////////////////////////////////////////////////////////////////
  // * Attacking *
  //////////////////////////////////////////////////////////////////////
  input.heldMouseButtons.on('add', 'LMB', (): void => {
    startUsing(actor.inventory.heldIn(0));

    input.heldMouseButtons.once('delete', 'LMB', stopUsing);
  });
};
