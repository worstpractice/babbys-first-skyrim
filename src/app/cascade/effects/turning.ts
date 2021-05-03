import { input } from "../../input/input";
import { player } from "../../player/player";

export const startTurning = () => {
  const isPlayerTurning = input.heldKeys.has("KeyA") || input.heldKeys.has("KeyD");

  if (!isPlayerTurning) return;

  player.activeEffects.add("turning");
};

export const stopTurning = () => {
  player.activeEffects.delete("turning");
};
