import type { ActionDuo } from 'src/game/typings/ActionDuo';
import type { Actions } from 'src/game/typings/Actions';
import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';
import type { AnimationMixerListener } from 'src/game/typings/AnimationMixerListener';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import { itemNameToAnimation } from 'src/lookup-tables/itemNameToAnimation';
import { slotNumberToItemName } from 'src/lookup-tables/slotNumberToItemName';
import type { ItemName } from 'src/typings/ItemName';
import type { SlotNumber } from 'src/typings/phantom-types/number/SlotNumber';

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
    stopAttacking,
    startRunning,
    startWalking,
    stopIdling,
    stopRunning,
    stopWalking,
  } = actions;

  const itemNameToActionDuo: { readonly [key in ItemName]: ActionDuo } = {
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
  player.activeEffects.on('empty', startIdling);

  //////////////////////////////////////////////////////////////////////
  // * From Idling To Moving *
  //////////////////////////////////////////////////////////////////////
  player.activeEffects.on('add', 'moving', (): void => {
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
  player.activeEffects.on('delete', 'moving', (): void => {
    stopRunning();
    stopWalking();
  });

  //////////////////////////////////////////////////////////////////////
  // * Start Using  *
  //////////////////////////////////////////////////////////////////////
  player.activeEffects.on('add', 'using', (): void => {
    /** NOTE: We consult the currently equipped item about what pair of start/stop functions to actually call here. */
    const currentItem = slotNumberToItemName[0 as SlotNumber] ?? '';

    const { start, stop } = itemNameToActionDuo[currentItem];

    const animation = itemNameToAnimation[currentItem];

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
