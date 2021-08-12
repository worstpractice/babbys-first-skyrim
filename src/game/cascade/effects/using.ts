import { player } from "src/game/player/player";

export const startUsing = () => {
  player.activeEffects.add("using");
};

export const stopUsing = () => {
  player.activeEffects.delete("using");
};
