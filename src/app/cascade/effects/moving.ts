import { input } from "../../input/input";
import { player } from "../../player/player";

export const startMoving = () => {
  const isPlayerMoving = Boolean(input.heldMovementKeys.size);

  if (!isPlayerMoving) return;

  player.activeEffects.add("moving");
};

export const stopMoving = () => {
  player.activeEffects.delete("moving");
};
