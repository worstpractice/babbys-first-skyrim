import { player } from "src/game/player/player";

export const startRunning = () => {
  const isMoving = player.activeEffects.has("moving");

  if (!isMoving) return;

  player.activeAnimations.add("running");
};

export const stopRunning = () => {
  player.activeAnimations.delete("running");
};
