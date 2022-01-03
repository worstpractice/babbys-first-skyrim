import { itemNameToMesh } from 'src/views/lookup-tables/itemNameToMesh';
import type { SlotEvent } from 'src/views/typings/inventory/SlotEvent';
import { isHandSlot } from 'src/views/utils/type-predicates/isInHands';

export const handleChange = ({ item, slot }: SlotEvent): void => {
  const { name } = item;

  const model = itemNameToMesh[name];

  if (!model) return console.warn(`No model for ${name}!`);

  const isBeingEquipped = isHandSlot(slot);

  model.visible = isBeingEquipped;

  const verb = isBeingEquipped ? 'Equipped' : 'Moved';

  console.log(`${verb} ${name} into slot #${slot}`);
};
