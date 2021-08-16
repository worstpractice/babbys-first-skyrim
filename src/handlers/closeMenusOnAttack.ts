import { useUiState } from 'src/state/UiState';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

export const closeMenusOnAttack = ({ target }: MouseEvent) => {
  if (target === canvas) {
    useUiState.setState({ currentOpenMenu: '' });
  }
};
