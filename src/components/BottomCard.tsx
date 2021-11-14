import type { MouseEventHandler } from 'react';
import { default as React } from 'react';
import { BACKGROUND } from 'src/styles';
import type { MenuName } from 'src/typings/MenuName';
import { css } from 'src/utils/as/css';

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
  card: css({
    ...BACKGROUND,
    borderRadius: '5%',
    cursor: 'pointer',
    height: 75,
    padding: 10,
    pointerEvents: 'all',
    width: 75,
  }),
} as const;
