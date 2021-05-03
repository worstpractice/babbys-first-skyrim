import { useUiState } from "../state/UiState";

export type Hotkey = "KeyI" | "KeyC" | "KeyQ";

export const handleHotkeys = (event: KeyboardEvent): void => {
  const { code } = event;

  switch (code as Hotkey) {
    case "KeyC": {
      return useUiState.getState().toggleCurrentOpenMenu("character");
    }
    case "KeyI": {
      return useUiState.getState().toggleCurrentOpenMenu("inventory");
    }
    case "KeyQ": {
      return useUiState.getState().toggleCurrentOpenMenu("quests");
    }
    default: {
      break;
    }
  }
};
