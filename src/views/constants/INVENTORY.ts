import type { ItemName } from 'src/views/typings/ItemName';

const ROW_LENGTH = {
  length: 8,
} as const;

export const FIRST_ROW: readonly ItemName[] = Array.from<ItemName>(ROW_LENGTH).fill('');

export const SECOND_ROW: readonly ItemName[] = FIRST_ROW;

export const THIRD_ROW: readonly ItemName[] = SECOND_ROW;

const COLUMN_LENGTH = {
  length: 4,
} as const;

export const LEFT_COLUMN: readonly ItemName[] = Array.from<ItemName>(COLUMN_LENGTH).fill('');
export const RIGHT_COLUMN = LEFT_COLUMN;
