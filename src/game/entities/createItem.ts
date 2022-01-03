import type { InventoryItem } from 'src/game/typings/InventoryItem';

export const createInventoryItem = <T extends InventoryItem>(t: T & InventoryItem): T => {
  return t;
};
