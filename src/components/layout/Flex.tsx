import type { CSSProperties, MouseEventHandler, ReactChild } from 'react';
import { default as React } from 'react';
import { as } from 'src/utils/as';

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
  flex: as<CSSProperties>({
    display: 'flex',
    flexDirection: 'row',
    gap: 6.25,
    justifyContent: 'space-evenly',
  }),
} as const;

const directionStyles = {
  column: as<CSSProperties>({
    ...styles.flex,
    flexDirection: 'column',
  }),
  row: as<CSSProperties>({
    ...styles.flex,
    flexDirection: 'row',
  }),
} as const;
