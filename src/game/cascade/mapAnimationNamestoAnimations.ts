import { player } from 'src/game/player/player';

export const mapAnimationNamesToAnimations = (): void => {
  player.activeAnimations.on('add', ({ value }): void => {
    console.log(`add ${value}`);
    const { action } = player.animations[value];

    action.play();
  });

  player.activeAnimations.on('delete', ({ value }): void => {
    console.log(`delete ${value}`);
    const { action } = player.animations[value];

    action.stop();
  });
};
