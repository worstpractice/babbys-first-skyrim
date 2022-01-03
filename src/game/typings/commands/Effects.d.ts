import type { InventoryItem } from 'src/game/typings/InventoryItem';

export type Effects = {
  readonly startLevitating: (this: void) => void;
  readonly startMoving: (this: void) => void;
  readonly startTurning: (this: void) => void;
  readonly startUsing: (this: void, item: InventoryItem) => void;
  readonly stopLevitating: (this: void) => void;
  readonly stopMoving: (this: void) => void;
  readonly stopTurning: (this: void) => void;
  readonly stopUsing: (this: void) => void;
};
