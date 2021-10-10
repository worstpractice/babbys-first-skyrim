import type { ItemName } from 'src/typings/ItemName';

const equipped: ItemName[] = [
  //
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  'sword',
];

export const character = {
  equip(item: ItemName, slot: number): void {
    equipped[slot] = item;
  },

  heldIn(slot: number): ItemName {
    return equipped[slot] ?? '';
  },
} as const;
