import type { Actor } from 'src/game/typings/Actor';
import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';
import type { AnimationMixerListener } from 'src/game/typings/AnimationMixerListener';
import type { Actions } from 'src/game/typings/commands/Actions';
import type { Input } from 'src/game/typings/Input';
import { itemNameToAction } from 'src/views/lookup-tables/itemNameToAnimation';

type Props = {
  readonly actor: Actor;
  readonly actions: Actions;
  readonly input: Input;
};

export const mapEffectsToAnimationNames = ({ actions, input, actor }: Props): void => {
  const {
    //
    quickenToRun,
    slowToWalk,
    startAttacking,
    startIdling,
    startRunning,
    startWalking,
    stopAttacking,
    stopIdling,
    stopRunning,
    stopWalking,
  } = actions;

  const itemNameToCommand = {
    /** Empty hands mean you idle on LMB. */
    '': {
      start: startIdling,
      stop: stopIdling,
    },
    sword: {
      start: startAttacking,
      stop: stopAttacking,
    },
  } as const;

  //////////////////////////////////////////////////////////////////////
  // * From Nothing To Idling *
  //////////////////////////////////////////////////////////////////////
  actor.effects.on('empty', startIdling);

  //////////////////////////////////////////////////////////////////////
  // * From Idling To Moving *
  //////////////////////////////////////////////////////////////////////
  actor.effects.on('add', 'moving', (): void => {
    const isRunning = input.heldModifierKeys.has('ShiftLeft');

    if (isRunning) {
      startRunning();
      input.heldModifierKeys.once('remove', 'ShiftLeft', slowToWalk);
    } else {
      startWalking();
      input.heldModifierKeys.once('add', 'ShiftLeft', quickenToRun);
    }
  });

  //////////////////////////////////////////////////////////////////////
  // * From Walking To Running (And Back Again) *
  //////////////////////////////////////////////////////////////////////
  input.heldModifierKeys.on('add', 'ShiftLeft', (): void => {
    startRunning();

    input.heldModifierKeys.once('remove', 'ShiftLeft', slowToWalk);
  });

  //////////////////////////////////////////////////////////////////////
  // * From Moving To Nothing  *
  //////////////////////////////////////////////////////////////////////
  actor.effects.on('remove', 'moving', (): void => {
    stopRunning();
    stopWalking();
  });

  //////////////////////////////////////////////////////////////////////
  // * Start Using  *
  //////////////////////////////////////////////////////////////////////
  actor.effects.on('add', 'using', (): void => {
    /** NOTE: We consult the currently equipped item about what pair of start/stop functions to actually call here. */
    const { name } = actor.inventory.heldIn(0);

    const { start, stop } = itemNameToCommand[name];

    const animation = itemNameToAction[name];

    start();

    const stopAndCleanUp = ({ action }: AnimationMixerEvent): void => {
      const clip = action.getClip();

      if (clip.name !== `${animation}Clip`) return;

      stop();

      actor.mixer.removeEventListener('finished', stop);
    };

    /** NOTE: make sure the relevant `stopFooing()` also calls `stopUsing()`. */
    (actor.mixer.addEventListener as AnimationMixerListener)('finished', stopAndCleanUp);
  });

  //////////////////////////////////////////////////////////////////////
};
