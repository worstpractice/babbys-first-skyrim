import type { Player } from 'src/game/typings/Player';

export const mapAnimationNamesToAnimations = (player: Player): void => {
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
