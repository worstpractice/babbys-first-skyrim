import create from "zustand";
import { combine } from "zustand/middleware";
import type { DraggedState } from "../typings/state/DraggedState";

export type Data = {
  readonly currentlyDraggedElement: HTMLDivElement | null;
};

export type Actions = {
  readonly setCurrentlyDraggedElement: (to: HTMLDivElement | null) => void;
};

// NOTE: Remember to create a`DraggedState.d.ts` file under typings/state and import type `DraggedState` from there.

export const useDraggedState = create<DraggedState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      currentlyDraggedElement: null,
      ///////////////////////////////////////////
    } as const,
    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setCurrentlyDraggedElement: (to: HTMLDivElement | null) => {
          set(
            (state): Data => {
              const { currentlyDraggedElement } = state;

              if (currentlyDraggedElement === to) {
                return state;
              }

              return { ...state, currentlyDraggedElement: to } as const;
            },
          );
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
