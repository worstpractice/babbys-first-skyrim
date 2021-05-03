import { player } from "../../player/player";

export const startAttacking = () => {
  const isUsing = player.activeEffects.has("using");

  if (!isUsing) return;

  player.activeAnimations.add("attacking");
};

export const stopAttacking = () => {
  player.activeAnimations.delete("attacking");
};
