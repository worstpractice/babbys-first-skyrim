import { default as React } from 'react';
import { BACKGROUND } from 'src/views/styles';
import { css } from 'src/views/utils/as/css';

type Props = {
  readonly [key in PropertyKey]: never;
};

export const Portrait = ({}: Props) => {
  return <div style={styles.portrait} />;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  portrait: css({
    ...BACKGROUND,
    borderRadius: '50%',
    height: 280,
    pointerEvents: 'all',
    width: 280,
  } as const),
} as const;
