import type { SetOperation } from 'obset';

export const createSnitch = <T extends string>(label: T) => {
  const snitch = <T>(value: T, operation: SetOperation) => {
    const emoji = operation === 'add' ? '➕' : '➖';

    console.log(`${label}: ${emoji} ${operation} ${value}`);
  };

  return snitch;
};
