import { player } from "../../player/player";

export const startJumping = () => {
  const hasNothingToPushOffAgainst = player.activeEffects.has("levitating");

  if (hasNothingToPushOffAgainst) return;

  player.activeAnimations.add("jumping");
};

export const stopJumping = () => {
  player.activeAnimations.delete("jumping");
};
