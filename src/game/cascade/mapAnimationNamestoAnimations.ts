import type { Player } from 'src/game/typings/Player';

export const mapAnimationNamesToAnimations = ({ activeAnimations, animations }: Player): void => {
  activeAnimations.on('add', ({ value }): void => {
    console.log(`add ${value}`);
    const { action } = animations[value];

    action.play();
  });

  activeAnimations.on('delete', ({ value }): void => {
    console.log(`delete ${value}`);
    const { action } = animations[value];

    action.stop();
  });
};
