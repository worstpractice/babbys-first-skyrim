import create from "zustand";
import { combine } from "zustand/middleware";
import type { ItemName } from "../typings/ItemName";
import type { CharacterState } from "../typings/state/CharacterState";

export type Data = {
  readonly mainHand: ItemName;
};

export type Actions = {
  readonly equipInMainHand: (item: ItemName) => void;
};

export const useCharacterState = create<CharacterState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      mainHand: "",
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        equipInMainHand: (item: ItemName) => {
          set((state): Data => {
            const { mainHand } = state;

            if (mainHand === item) {
              return state;
            }

            return { mainHand: item } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
