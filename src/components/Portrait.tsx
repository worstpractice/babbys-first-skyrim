import type { CSSProperties } from "react";
import { default as React } from "react";
import { BACKGROUND } from "src/styles";

type Props = {};

export const Portrait = ({}: Props) => {
  return <div style={styles.portrait} />;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  portrait: {
    ...BACKGROUND,
    borderRadius: "50%",
    height: 225,
    pointerEvents: "all",
    width: 225,
  } as CSSProperties,
} as const;
