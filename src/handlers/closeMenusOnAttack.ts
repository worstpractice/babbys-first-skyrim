import { CANVAS } from 'src/constants/CANVAS';
import { useUiState } from 'src/state/UiState';

export const closeMenusOnAttack = ({ target }: MouseEvent) => {
  if (target !== CANVAS) return;

  useUiState.setState({ currentOpenMenu: '' });
};
