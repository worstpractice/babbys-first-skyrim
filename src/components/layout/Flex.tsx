import type { CSSProperties, MouseEventHandler, ReactChild } from "react";
import { default as React } from "react";

type Props = {
  readonly children: ReactChild | readonly ReactChild[];
  readonly direction: "row" | "column";
  readonly resetClickState?: MouseEventHandler<HTMLDivElement>;
  readonly style?: CSSProperties;
};

export const Flex = ({ children, direction, resetClickState, style }: Props) => {
  const directionStyle = directionStyles[direction];

  const flexStyle: CSSProperties = style ? { ...directionStyle, ...style } : directionStyle;

  return (
    <div onMouseLeave={resetClickState} onMouseUp={resetClickState} style={flexStyle}>
      {children}
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  flex: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-evenly",
  } as CSSProperties,
} as const;

const directionStyles = {
  column: {
    ...styles.flex,
    flexDirection: "column",
  } as CSSProperties,
  row: {
    ...styles.flex,
    flexDirection: "row",
  } as CSSProperties,
} as const;
