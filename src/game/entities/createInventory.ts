import { DE_NADA } from 'src/game/constants/DE_NADA';
import { createItem } from 'src/game/entities/createItem';
import type { Inventory } from 'src/game/typings/Inventory';
import type { Item } from 'src/game/typings/Item';
import type { Slots } from 'src/game/typings/Slots';
import type { Slot } from 'src/typings/inventory/Slot';

export const createInventory = (): Inventory => {
  // 24 in total (slot 0-23)
  const INVENTORY: Slots = {
    // 8 equipped (slot 0-7)
    0: DE_NADA, // mainhand
    1: DE_NADA, // offhand
    2: DE_NADA, // head
    3: DE_NADA, // feet
    4: DE_NADA, // legs
    5: DE_NADA, // torso
    6: DE_NADA, // ringfinger
    7: DE_NADA, // neck

    // 16 bagged (slot 8-23)
    8: createItem('sword'),
    9: DE_NADA,
    10: DE_NADA,
    11: DE_NADA,
    12: DE_NADA,
    13: DE_NADA,
    14: DE_NADA,
    15: DE_NADA,
    16: DE_NADA,
    17: DE_NADA,
    18: DE_NADA,
    19: DE_NADA,
    20: DE_NADA,
    21: DE_NADA,
    22: DE_NADA,
    23: DE_NADA,
  };

  const equip = (item: Item, slot: Slot): Item => {
    const previouslyEquippedItem = INVENTORY[slot];

    INVENTORY[slot] = item;

    return previouslyEquippedItem;
  };

  const heldIn = (slot: Slot): Item => {
    return INVENTORY[slot];
  };

  const swap = (slotA: Slot, slotB: Slot): void => {
    const itemA = INVENTORY[slotA];
    const itemB = INVENTORY[slotB];

    equip(itemA, slotB);
    equip(itemB, slotA);
  };

  const unequip = (slot: Slot): Item => {
    return equip(DE_NADA, slot);
  };

  return {
    equip,
    heldIn,
    swap,
    unequip,
  } as const;
};
