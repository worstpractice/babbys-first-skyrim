import { player } from "../player/player";

export const mapAnimationNamesToAnimations = (): void => {
  player.activeAnimations.onAny("add", ({ value }) => {
    console.log(`add ${value}`);
    const { action } = player.animations[value];

    action.play();
  });

  player.activeAnimations.onAny("delete", ({ value }) => {
    console.log(`delete ${value}`);
    const { action } = player.animations[value];

    action.stop();
  });
};
