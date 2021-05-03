import type { CSSProperties } from "react";
import { default as React } from "react";
import { FIRST_ROW, LEFT_COLUMN, RIGHT_COLUMN, SECOUND_ROW, THIRD_ROW } from "../constants/INVENTORY";
import { useClickedState } from "../state/ClickedState";
import { useDraggedState } from "../state/DraggedState";
import { useUiState } from "../state/UiState";
import { BACKGROUND } from "../styles";
import type { SlotNumber } from "../typings/phantom-types/number/SlotNumber";
import type { ClickedState } from "../typings/state/ClickedState";
import type { DraggedState } from "../typings/state/DraggedState";
import type { UiState } from "../typings/state/UiState";
import { InventorySlot } from "./InventorySlot";
import { Flex } from "./layout/Flex";
import { Statue } from "./Statue";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClicked = ({ setCurrentlyClickedElement }: ClickedState) => {
  return {
    setCurrentlyClickedElement,
  } as const;
};

const fromDragged = ({ setCurrentlyDraggedElement }: DraggedState) => {
  return { setCurrentlyDraggedElement } as const;
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
