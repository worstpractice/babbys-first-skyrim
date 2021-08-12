import { player } from "src/game/player/player";

export const startIdling = () => {
  const isDoingSomething = Boolean(player.activeEffects.size);

  if (isDoingSomething) return;

  player.activeAnimations.add("idling");
};

export const stopIdling = () => {
  player.activeAnimations.delete("idling");
};
