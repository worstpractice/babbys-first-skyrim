import { input } from "../input/input";
import { player } from "../player/player";
import type { AnimationMixerEvent } from "src/typings/AnimationMixerEvent";
import type { AnimationMixerListener } from "src/typings/AnimationMixerListener";
import { startJumping, stopJumping } from "./animations/jumping";
import { startMoving, stopMoving } from "./effects/moving";
import { startTurning, stopTurning } from "./effects/turning";
import { startUsing, stopUsing } from "./effects/using";

const stopJumpingAndCleanUp = ({ action }: AnimationMixerEvent) => {
  const clip = action.getClip();

  if (clip.name !== "jumpingClip") return;

  stopJumping();

  player.mixer.removeEventListener("finished", stopJumping);
};

export const mapKeysToEffects = (): void => {
  //////////////////////////////////////////////////////////////////////
  // * Moving *
  //////////////////////////////////////////////////////////////////////
  input.heldMovementKeys.onAny("add", () => {
    const isTreadingWater = input.heldMovementKeys.has("KeyS") && input.heldMovementKeys.has("KeyW");

    if (isTreadingWater) {
      stopMoving();
    } else {
      startMoving();
    }
  });

  input.heldMovementKeys.onAny("delete", () => {
    const isTreadingWater = input.heldMovementKeys.has("KeyS") && input.heldMovementKeys.has("KeyW");

    if (!isTreadingWater) {
      startMoving();
    }
  });

  input.heldMovementKeys.onEmpty(stopMoving);

  //////////////////////////////////////////////////////////////////////
  // * Turning *
  //////////////////////////////////////////////////////////////////////
  input.heldActionKeys.onAny("add", ({ value }) => {
    const isTurning = value === "KeyD" || value === "KeyA";

    if (!isTurning) return;

    const isTreadingWater = input.heldActionKeys.has("KeyA") && input.heldActionKeys.has("KeyD");

    if (isTreadingWater) {
      stopTurning();
      input.heldActionKeys.onceAny("delete", ({ value }) => {
        const isTurning = value === "KeyD" || value === "KeyA";

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
  input.heldActionKeys.on("add", "Space", () => {
    (player.mixer.addEventListener as AnimationMixerListener)("finished", stopJumpingAndCleanUp);

    startJumping();
  });

  //////////////////////////////////////////////////////////////////////
  // * Attacking *
  //////////////////////////////////////////////////////////////////////
  input.heldMouseButtons.on("add", "LMB", () => {
    startUsing();

    input.heldMouseButtons.once("delete", "LMB", stopUsing);
  });
};
