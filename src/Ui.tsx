import type { CSSProperties, MouseEventHandler } from "react";
import { default as React } from "react";
import { BottomCard } from "./components/BottomCard";
import { Character } from "./components/Character";
import { Inventory } from "./components/Inventory";
import { Portrait } from "./components/Portrait";
import { Quests } from "./components/Quests";
import { useUiState } from "./state/UiState";
import type { UiState } from "./typings/state/UiState";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromUi = ({ toggleCurrentOpenMenu }: UiState) => {
  return {
    toggleCurrentOpenMenu,
  } as const;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const Ui = ({}: Props) => {
  const { toggleCurrentOpenMenu } = useUiState(fromUi);

  const handleClickCharacter: MouseEventHandler<HTMLElement> = () => {
    toggleCurrentOpenMenu("character");
  };

  const handleClickInventory: MouseEventHandler<HTMLElement> = () => {
    toggleCurrentOpenMenu("inventory");
  };

  const handleClickQuests: MouseEventHandler<HTMLElement> = () => {
    toggleCurrentOpenMenu("quests");
  };

  return (
    <div style={styles.ui}>
      <div style={styles.topHalf}>
        <Portrait />
        <Inventory />
        <Character />
        <Quests />
      </div>
      <div style={styles.bottomHalf}>
        <BottomCard iconName="character" onClick={handleClickCharacter} />
        <BottomCard iconName="inventory" onClick={handleClickInventory} />
        <BottomCard iconName="quests" onClick={handleClickQuests} />
      </div>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  bottomHalf: {
    alignItems: "flex-end",
    display: "flex",
    gap: 10,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  } as CSSProperties,
  topHalf: {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    width: "100%",
  } as CSSProperties,
  ui: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    width: "100%",
  } as CSSProperties,
} as const;
