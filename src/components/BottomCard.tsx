import type { CSSProperties, MouseEventHandler } from "react";
import { default as React } from "react";
import { BACKGROUND } from "src/styles";
import type { MenuName } from "src/typings/MenuName";

type Props = {
  iconName: MenuName;
  onClick: MouseEventHandler<HTMLElement>;
};

export const BottomCard = ({ iconName, onClick }: Props) => {
  return (
    <div onClick={onClick} style={styles.card}>
      <img src={`/assets/icons/${iconName}.svg`} />
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  card: {
    ...BACKGROUND,
    borderRadius: "5%",
    cursor: "pointer",
    height: 50,
    padding: 10,
    pointerEvents: "all",
    width: 50,
  } as CSSProperties,
} as const;
