import { startIdling } from 'src/game/cascade/animations/idling';
import { startRunning, stopRunning } from 'src/game/cascade/animations/running';
import { startWalking, stopWalking } from 'src/game/cascade/animations/walking';
import { player } from 'src/game/player/player';
import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';
import type { AnimationMixerListener } from 'src/game/typings/AnimationMixerListener';
import type { Input } from 'src/game/typings/Input';
import { indexToItem } from 'src/lookup-tables/indexToItem';
import { itemToAnimation } from 'src/lookup-tables/itemToAnimation';
import { itemToAnimationDuo } from 'src/lookup-tables/itemToAnimationDuo';
import type { SlotNumber } from 'src/typings/phantom-types/number/SlotNumber';

const slowToWalk = (): void => {
  stopRunning();
  startWalking();
};

const quickenToRun = (): void => {
  stopWalking();
  startRunning();
};

export const mapEffectsToAnimationNames = (input: Input): void => {
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

  //////////////////////////////////////////////////////////////////////ddddd
  // * Start Using  *
  //////////////////////////////////////////////////////////////////////
  player.activeEffects.on('add', 'using', (): void => {
    /** NOTE: We consult the currently equipped item about what pair of start/stop functions to actually call here. */
    const currentItem = indexToItem[0 as SlotNumber] ?? '';

    const { start, stop } = itemToAnimationDuo[currentItem];

    const animation = itemToAnimation[currentItem];

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
