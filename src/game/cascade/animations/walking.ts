import { player } from "src/game/player/player";

export const startWalking = () => {
  const isMoving = player.activeEffects.has("moving");

  if (!isMoving) return;

  player.activeAnimations.add("walking");
};

export const stopWalking = () => {
  player.activeAnimations.delete("walking");
};
