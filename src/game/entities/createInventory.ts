import { DE_NADA } from 'src/game/constants/DE_NADA';
import type { Inventory } from 'src/game/typings/Inventory';
import type { InventoryItem } from 'src/game/typings/InventoryItem';
import type { Slots } from 'src/game/typings/Slots';
import type { Slot } from 'src/views/typings/inventory/Slot';

type Props = {
  readonly startingItems: readonly InventoryItem[];
};

export const createInventory = ({ startingItems }: Props): Inventory => {
  // 24 in total (slot 0-23)
  const inventory: Slots = {
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
    8: DE_NADA, // starta
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

  // eslint-disable-next-line no-lone-blocks
  {
    let slot = 8;

    for (const startingItem of startingItems) {
      inventory[slot++ as Slot] = startingItem;
    }
  }

  ////////////////////////////////////////////////////////////////////

  const equip = (item: InventoryItem, slot: Slot): InventoryItem => {
    const previouslyEquippedItem = inventory[slot];

    inventory[slot] = item;

    return previouslyEquippedItem;
  };

  const heldIn = (slot: Slot): InventoryItem => {
    return inventory[slot];
  };

  const swap = (slotA: Slot, slotB: Slot): void => {
    const itemA = inventory[slotA];
    const itemB = inventory[slotB];

    equip(itemA, slotB);
    equip(itemB, slotA);
  };

  const unequip = (slot: Slot): InventoryItem => {
    return equip(DE_NADA, slot);
  };

  return {
    equip,
    heldIn,
    swap,
    unequip,
  } as const;
};
