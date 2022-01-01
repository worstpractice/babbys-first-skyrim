import type { DraggedState } from 'src/views/typings/state/DraggedState';
import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly currentlyDraggedElement: HTMLDivElement | null;
};

export type Actions = {
  readonly setCurrentlyDraggedElement: (this: void, to: HTMLDivElement | null) => void;
};

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
          set((state): Data => {
            const { currentlyDraggedElement } = state;

            if (currentlyDraggedElement === to) {
              return state;
            }

            return { ...state, currentlyDraggedElement: to } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
