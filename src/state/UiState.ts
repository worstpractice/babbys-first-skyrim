import create from "zustand";
import { combine } from "zustand/middleware";
import type { MenuName } from "../typings/MenuName";
import type { UiState } from "../typings/state/UiState";

export type Data = {
  readonly currentOpenMenu: MenuName;
};

export type Actions = {
  readonly toggleCurrentOpenMenu: (to: Exclude<MenuName, "">) => void;
};

export const useUiState = create<UiState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      currentOpenMenu: "",
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        toggleCurrentOpenMenu: (to: Exclude<MenuName, "">) => {
          set((state): Data => {
            const { currentOpenMenu } = state;

            /** Support switching directly from one menu to another. */
            if (currentOpenMenu && currentOpenMenu !== to) {
              return { currentOpenMenu: to } as const;
            }

            /** If a given menu is showing, clicking its menu button again closes it. */
            const newOpenMenu = currentOpenMenu ? "" : to;

            return { currentOpenMenu: newOpenMenu } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
