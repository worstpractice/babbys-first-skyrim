import type { SetEvent } from 'obset';

export const snitch = <T>({ operation, value }: SetEvent<T>) => {
  const emoji = operation === 'add' ? '➕' : '➖';

  console.log(`${emoji} ${operation} ${value}`);
};
