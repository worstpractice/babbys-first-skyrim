import type { Item } from 'src/game/typings/Item';
import { itemNameToAction } from 'src/views/lookup-tables/itemNameToAnimation';
import type { ItemName } from 'src/views/typings/ItemName';

export const createItem = <T extends ItemName>(name: T): Item => {
  return {
    application: itemNameToAction[name],
    name,
  } as const;
};
