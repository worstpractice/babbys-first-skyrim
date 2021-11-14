import { default as React, useRef } from 'react';
import { character } from 'src/lookup-tables/character';
import { useClickedState } from 'src/state/ClickedState';
import { useDraggedState } from 'src/state/DraggedState';
import type { Slot } from 'src/typings/inventory/Slot';
import type { SlotEvent } from 'src/typings/inventory/SlotEvent';
import type { ItemName } from 'src/typings/ItemName';
import type { ClickedState } from 'src/typings/state/ClickedState';
import type { DraggedState } from 'src/typings/state/DraggedState';
import { css } from 'src/utils/as/css';
import { from } from 'src/utils/from';
import { slot } from 'src/utils/make/slot';
import { toIconUrl } from 'src/utils/urls/toIconUrl';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClicked = from<ClickedState>().select('currentlyClickedElement', 'setCurrentlyClickedElement');
const fromDragged = from<DraggedState>().select('currentlyDraggedElement', 'setCurrentlyDraggedElement');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly item?: ItemName;
  readonly onItem: (event: SlotEvent) => void;
  readonly index: Slot;
};

export const InventorySlot = ({ onItem, index }: Props) => {
  const { currentlyClickedElement, setCurrentlyClickedElement } = useClickedState(fromClicked);
  const { currentlyDraggedElement, setCurrentlyDraggedElement } = useDraggedState(fromDragged);
  const slotRef = useRef<HTMLDivElement>(null);
  const item = character.heldIn(index);

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
    const theirIndex = slot(Number.parseInt(them.id));

    const myBackgroundImage = me.style.backgroundImage;
    const theirBackgroundImage = them.style.backgroundImage;

    // Swap background images
    me.style.backgroundImage = theirBackgroundImage;
    them.style.backgroundImage = myBackgroundImage;

    setCurrentlyClickedElement(null);
    setCurrentlyDraggedElement(null);

    character.swap(myIndex, theirIndex);

    onItem({
      item: character.heldIn(myIndex),
      slot: index,
    } as const);
  };

  ///////////////////////////////////////////////////////////////////////////
  const handleMouseLeave = (): void => {
    const { current } = slotRef;

    if (!current?.style.backgroundImage) return;
    if (currentlyClickedElement !== current) return;

    setCurrentlyDraggedElement(current);
  };

  ///////////////////////////////////////////////////////////////////////////
  const style = item
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
  slot: css({
    backgroundColor: 'rgb(0, 0, 0, 1)',
    border: 'rgb(0, 0, 0, 1)',
    borderRadius: '5%',
    borderStyle: 'solid',
    height: 60,
    padding: 12.5,
    pointerEvents: 'all',
  } as const),
} as const;

const slotStyles = {
  occupied: css({
    ...styles.slot,
    cursor: 'pointer',
  } as const),
  vacant: css({
    ...styles.slot,
  } as const),
} as const;
