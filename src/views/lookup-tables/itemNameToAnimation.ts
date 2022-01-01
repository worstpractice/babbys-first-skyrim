import type { Action } from 'src/game/typings/Action';
import type { ItemName } from 'src/views/typings/ItemName';

export const itemNameToAction: { readonly [key in ItemName]: Action } = {
  '': 'idling',
  sword: 'attacking',
} as const;
