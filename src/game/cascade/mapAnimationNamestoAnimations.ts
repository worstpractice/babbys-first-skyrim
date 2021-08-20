import type { Player } from 'src/game/typings/Player';

export const mapAnimationNamesToAnimations = ({ activeAnimations, actionClips }: Player): void => {
  activeAnimations.on('add', ({ value }): void => {
    console.log(`add ${value}`);
    const { action } = actionClips[value];

    action.play();
  });

  activeAnimations.on('delete', ({ value }): void => {
    console.log(`delete ${value}`);
    const { action } = actionClips[value];

    action.stop();
  });
};
