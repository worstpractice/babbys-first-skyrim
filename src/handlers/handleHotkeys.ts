import { useUiState } from 'src/state/UiState';
import type { Hotkey } from 'src/typings/Hotkey';

export const handleHotkeys = ({ code }: KeyboardEvent): void => {
  switch (code as Hotkey) {
    case 'KeyC': {
      return useUiState.getState().toggleCurrentOpenMenu('character');
    }

    case 'KeyI': {
      return useUiState.getState().toggleCurrentOpenMenu('inventory');
    }

    case 'KeyQ': {
      return useUiState.getState().toggleCurrentOpenMenu('quests');
    }

    default: {
      return;
    }
  }
};
