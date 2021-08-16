import { player } from 'src/game/player/player';

export const mapAnimationNamesToAnimations = (): void => {
  player.activeAnimations.on('add', ({ value }) => {
    console.log(`add ${value}`);
    const { action } = player.animations[value];

    action.play();
  });

  player.activeAnimations.on('delete', ({ value }) => {
    console.log(`delete ${value}`);
    const { action } = player.animations[value];

    action.stop();
  });
};
