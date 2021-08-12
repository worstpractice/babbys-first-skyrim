import type { CSSProperties } from "react";
import { default as React } from "react";
import { InventorySlot } from "src/components/InventorySlot";
import { Flex } from "src/components/layout/Flex";
import { Statue } from "src/components/Statue";
import { FIRST_ROW, LEFT_COLUMN, RIGHT_COLUMN, SECOUND_ROW, THIRD_ROW } from "src/constants/INVENTORY";
import { useClickedState } from "src/state/ClickedState";
import { useDraggedState } from "src/state/DraggedState";
import { useUiState } from "src/state/UiState";
import { BACKGROUND } from "src/styles";
import type { SlotNumber } from "src/typings/phantom-types/number/SlotNumber";
import type { ClickedState } from "src/typings/state/ClickedState";
import type { DraggedState } from "src/typings/state/DraggedState";
import type { UiState } from "src/typings/state/UiState";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClicked = ({ setCurrentlyClickedElement }: ClickedState) => {
  return {
    setCurrentlyClickedElement,
  } as const;
};

const fromDragged = ({ setCurrentlyDraggedElement }: DraggedState) => {
  return {
    setCurrentlyDraggedElement,
  } as const;
};

const fromUi = ({ currentOpenMenu }: UiState) => {
  return {
    currentOpenMenu,
  } as const;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const Inventory = ({}: Props) => {
  const { setCurrentlyClickedElement } = useClickedState(fromClicked);
  const { setCurrentlyDraggedElement } = useDraggedState(fromDragged);
  const { currentOpenMenu } = useUiState(fromUi);

  if (currentOpenMenu !== "inventory") return null;

  const resetClickState = () => {
    setCurrentlyClickedElement(null);
    setCurrentlyDraggedElement(null);
  };

  let slotNumber = 0 as SlotNumber;

  return (
    <Flex direction="column" resetClickState={resetClickState} style={styles.inventory}>
      <Flex direction="row">
        <Flex direction="column">
          {LEFT_COLUMN.map(() => {
            const index = slotNumber++ as SlotNumber;

            return <InventorySlot index={index} key={index} />;
          })}
        </Flex>
        <Statue />
        <Flex direction="column">
          {RIGHT_COLUMN.map(() => {
            const index = slotNumber++ as SlotNumber;

            return <InventorySlot index={index} key={index} />;
          })}
        </Flex>
      </Flex>
      <Flex direction="row">
        {FIRST_ROW.map(() => {
          const index = slotNumber++ as SlotNumber;

          return <InventorySlot index={index} key={index} />;
        })}
      </Flex>
      <Flex direction="row">
        {SECOUND_ROW.map(() => {
          const index = slotNumber++ as SlotNumber;

          return <InventorySlot index={index} key={index} />;
        })}
      </Flex>
      <Flex direction="row">
        {THIRD_ROW.map(() => {
          const index = slotNumber++ as SlotNumber;

          return <InventorySlot index={index} key={index} />;
        })}
      </Flex>
    </Flex>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  inventory: {
    ...BACKGROUND,
    paddingBottom: 25,
    paddingLeft: 25,
    paddingRight: 25,
    pointerEvents: "all",
  } as CSSProperties,
} as const;
