import create from 'zustand';
import { combine } from 'zustand/middleware';
import type { ClickedState } from 'src/typings/state/ClickedState';

export type Data = {
  readonly currentlyClickedElement: HTMLDivElement | null;
};

export type Actions = {
  readonly setCurrentlyClickedElement: (to: HTMLDivElement | null) => void;
};

export const useClickedState = create<ClickedState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      currentlyClickedElement: null,
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setCurrentlyClickedElement: (to: HTMLDivElement | null): void => {
          set((state): Data => {
            const { currentlyClickedElement } = state;

            if (currentlyClickedElement === to) {
              return state;
            }

            return { ...state, currentlyClickedElement: to } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
