import { indexToItem } from "../../lookup-tables/indexToItem";
import { itemToAnimation } from "../../lookup-tables/itemToAnimation";
import { itemToAnimationDuo } from "../../lookup-tables/itemToAnimationDuo";
import type { SlotNumber } from "../../typings/phantom-types/number/SlotNumber";
import { input } from "../input/input";
import { player } from "../player/player";
import type { StartStopDuo } from "../typings/StartStopDuo";
import type { AnimationMixerEvent } from "../typings/AnimationMixerEvent";
import type { AnimationMixerListener } from "../typings/AnimationMixerListener";
import type { AnimationName } from "../typings/AnimationName";
import { startIdling } from "./animations/idling";
import { startRunning, stopRunning } from "./animations/running";
import { startWalking, stopWalking } from "./animations/walking";

const slowToWalk = () => {
  stopRunning();
  startWalking();
};

const quickenToRun = () => {
  stopWalking();
  startRunning();
};

export const mapEffectsToAnimationNames = () => {
  //////////////////////////////////////////////////////////////////////
  // * From Nothing To Idling *
  //////////////////////////////////////////////////////////////////////
  player.activeEffects.onEmpty(startIdling);

  //////////////////////////////////////////////////////////////////////
  // * From Idling To Moving *
  //////////////////////////////////////////////////////////////////////
  player.activeEffects.on("add", "moving", () => {
    const isRunning = input.heldModifierKeys.has("ShiftLeft");

    if (isRunning) {
      startRunning();
      input.heldModifierKeys.once("delete", "ShiftLeft", slowToWalk);
    } else {
      startWalking();
      input.heldModifierKeys.once("add", "ShiftLeft", quickenToRun);
    }
  });

  //////////////////////////////////////////////////////////////////////
  // * From Walking To Running (And Back Again) *
  //////////////////////////////////////////////////////////////////////
  input.heldModifierKeys.on("add", "ShiftLeft", () => {
    startRunning();

    input.heldModifierKeys.once("delete", "ShiftLeft", slowToWalk);
  });

  //////////////////////////////////////////////////////////////////////
  // * From Moving To Nothing  *
  //////////////////////////////////////////////////////////////////////
  player.activeEffects.on("delete", "moving", () => {
    stopRunning();
    stopWalking();
  });

  //////////////////////////////////////////////////////////////////////ddddd
  // * Start Using  *
  //////////////////////////////////////////////////////////////////////
  player.activeEffects.on("add", "using", () => {
    /** NOTE: We consult the currently equipped item about what pair of start/stop functions to actually call here. */
    const currentItem = indexToItem.get(0 as SlotNumber) ?? "";

    const { start, stop } = itemToAnimationDuo.get(currentItem) as StartStopDuo;

    const animation = itemToAnimation.get(currentItem) as AnimationName;

    start();

    const stopAndCleanUp = ({ action }: AnimationMixerEvent) => {
      const clip = action.getClip();

      if (clip.name !== `${animation}Clip`) return;

      stop();

      player.mixer.removeEventListener("finished", stop);
    };

    /** NOTE: make sure the relevant `stopFooing()` also calls `stopUsing()`. */
    (player.mixer.addEventListener as AnimationMixerListener)("finished", stopAndCleanUp);
  });

  //////////////////////////////////////////////////////////////////////
};
