import type { CSSProperties, MouseEventHandler, ReactChild } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/as/css';

type Props = {
  readonly children: ReactChild | readonly ReactChild[];
  readonly direction: 'row' | 'column';
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  flex: css({
    display: 'flex',
    flexDirection: 'row',
    gap: 6.25,
    justifyContent: 'space-evenly',
  } as const),
} as const;

const directionStyles = {
  column: css({
    ...styles.flex,
    flexDirection: 'column',
  } as const),
  row: css({
    ...styles.flex,
    flexDirection: 'row',
  } as const),
} as const;
