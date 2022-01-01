import { CANVAS } from 'src/views/constants/CANVAS';
import { useUiState } from 'src/views/state/UiState';

export const closeMenusOnAttack = ({ target }: MouseEvent): void => {
  if (target !== CANVAS) return;

  useUiState.setState({ currentOpenMenu: '' });
};
