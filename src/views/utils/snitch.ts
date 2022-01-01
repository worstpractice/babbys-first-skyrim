import type { SetOperation } from 'obset';

export const snitch = <T>(value: T, operation: SetOperation) => {
  const emoji = operation === 'add' ? '➕' : '➖';

  console.log(`${emoji} ${operation} ${value}`);
};
