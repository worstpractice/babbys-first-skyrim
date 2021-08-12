import { player } from "src/game/player/player";

export const startLevitating = () => {
  player.activeEffects.add("levitating");
};

export const stopLevitating = () => {
  player.activeEffects.delete("levitating");
};
