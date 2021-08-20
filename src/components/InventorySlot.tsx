import type { CSSProperties } from 'react';
import { default as React, useRef } from 'react';
import { slotNumberToItemName } from 'src/lookup-tables/slotNumberToItemName';
import { itemNameToModel } from 'src/lookup-tables/itemNameToModel';
import { useClickedState } from 'src/state/ClickedState';
import { useDraggedState } from 'src/state/DraggedState';
import type { ItemName } from 'src/typings/ItemName';
import type { SlotNumber } from 'src/typings/phantom-types/number/SlotNumber';
import type { SlotEvent } from 'src/typings/SlotEvent';
import type { ClickedState } from 'src/typings/state/ClickedState';
import type { DraggedState } from 'src/typings/state/DraggedState';
import { toIconUrl } from 'src/utils/urls/toIconUrl';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClicked = ({ currentlyClickedElement, setCurrentlyClickedElement }: ClickedState) => {
  return {
    currentlyClickedElement,
    setCurrentlyClickedElement,
  } as const;
};

const fromDragged = ({ currentlyDraggedElement, setCurrentlyDraggedElement }: DraggedState) => {
  return {
    currentlyDraggedElement,
    setCurrentlyDraggedElement,
  } as const;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Wonky Utils ¯\_(ツ)_/¯ *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleItem = ({ index, item }: SlotEvent): void => {
  const isBeingEquipped = index < 8;

  const weaponModel = itemNameToModel['sword'];

  if (!weaponModel) {
    console.warn(`No weapon model for sword!`);
    return;
  }

  weaponModel.visible = isBeingEquipped;

  const verb = isBeingEquipped ? 'Equipped' : 'Moved';

  console.log(`${verb} ${item} into slot #${index}`);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly item?: ItemName;
  readonly onItem?: (event: SlotEvent) => void;
  readonly index: SlotNumber;
};

export const InventorySlot = ({ onItem = handleItem, index }: Props) => {
  const { currentlyClickedElement, setCurrentlyClickedElement } = useClickedState(fromClicked);
  const { currentlyDraggedElement, setCurrentlyDraggedElement } = useDraggedState(fromDragged);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const item = slotNumberToItemName[index] ?? '';

  ///////////////////////////////////////////////////////////////////////////

  const handleMouseDown = (): void => {
    const { current } = slotRef;

    if (!current) return;
    if (!current.style.backgroundImage) return;

    setCurrentlyClickedElement(current);
  };

  ///////////////////////////////////////////////////////////////////////////

  const handleMouseUp = (): void => {
    const { current } = slotRef;

    if (!current) return;
    if (!currentlyDraggedElement) return;

    // Freaky friday
    const me = current;
    const them = currentlyDraggedElement;

    const myIndex = index;
    const theirIndex = Number.parseInt(them.id) as SlotNumber;

    const myBackgroundImage = me.style.backgroundImage;
    const theirBackgroundImage = them.style.backgroundImage;

    const myItem = slotNumberToItemName[myIndex] ?? '';
    const theirItem = slotNumberToItemName[theirIndex] ?? '';

    // Swap background images
    me.style.backgroundImage = theirBackgroundImage;
    them.style.backgroundImage = myBackgroundImage;

    // Swap game items
    slotNumberToItemName[theirIndex] = myItem;
    slotNumberToItemName[myIndex] = theirItem;

    setCurrentlyClickedElement(null);
    setCurrentlyDraggedElement(null);

    const myNewItem = theirItem;

    onItem({ index, item: myNewItem } as const);
  };

  ///////////////////////////////////////////////////////////////////////////

  const handleMouseLeave = (): void => {
    const { current } = slotRef;

    if (!current) return;
    if (!current.style.backgroundImage) return;
    if (currentlyClickedElement !== current) return;

    setCurrentlyDraggedElement(current);
  };

  ///////////////////////////////////////////////////////////////////////////

  const style: CSSProperties = item
    ? ({
        ...slotStyles.occupied,
        backgroundImage: toIconUrl(item),
      } as const)
    : slotStyles.vacant;

  return (
    <div
      //
      id={`${index}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      ref={slotRef}
      style={style}
    />
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  slot: {
    backgroundColor: 'rgb(0, 0, 0, 1)',
    border: 'rgb(0, 0, 0, 1)',
    borderRadius: '5%',
    borderStyle: 'solid',
    height: 60,
    padding: 12.5,
    pointerEvents: 'all',
    width: 60,
  } as CSSProperties,
} as const;

const slotStyles = {
  occupied: {
    ...styles.slot,
    cursor: 'pointer',
  } as CSSProperties,
  vacant: {
    ...styles.slot,
  } as CSSProperties,
} as const;
