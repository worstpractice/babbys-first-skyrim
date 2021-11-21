import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';
import type { AnimationMixerListener } from 'src/game/typings/AnimationMixerListener';
import type { Actions } from 'src/game/typings/commands/Actions';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import { itemNameToAction } from 'src/lookup-tables/itemNameToAnimation';

type Props = {
  readonly actions: Actions;
  readonly input: Input;
  readonly player: Player;
};

export const mapEffectsToAnimationNames = ({ actions, input, player }: Props): void => {
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
  player.effects.on('empty', startIdling);

  //////////////////////////////////////////////////////////////////////
  // * From Idling To Moving *
  //////////////////////////////////////////////////////////////////////
  player.effects.on('add', 'moving', (): void => {
    const isRunning = input.heldModifierKeys.has('ShiftLeft');

    if (isRunning) {
      startRunning();
      input.heldModifierKeys.once('delete', 'ShiftLeft', slowToWalk);
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

    input.heldModifierKeys.once('delete', 'ShiftLeft', slowToWalk);
  });

  //////////////////////////////////////////////////////////////////////
  // * From Moving To Nothing  *
  //////////////////////////////////////////////////////////////////////
  player.effects.on('delete', 'moving', (): void => {
    stopRunning();
    stopWalking();
  });

  //////////////////////////////////////////////////////////////////////
  // * Start Using  *
  //////////////////////////////////////////////////////////////////////
  player.effects.on('add', 'using', (): void => {
    /** NOTE: We consult the currently equipped item about what pair of start/stop functions to actually call here. */
    const { name } = player.inventory.heldIn(0);

    const { start, stop } = itemNameToCommand[name];

    const animation = itemNameToAction[name];

    start();

    const stopAndCleanUp = ({ action }: AnimationMixerEvent): void => {
      const clip = action.getClip();

      if (clip.name !== `${animation}Clip`) return;

      stop();

      player.mixer.removeEventListener('finished', stop);
    };

    /** NOTE: make sure the relevant `stopFooing()` also calls `stopUsing()`. */
    (player.mixer.addEventListener as AnimationMixerListener)('finished', stopAndCleanUp);
  });

  //////////////////////////////////////////////////////////////////////
};
