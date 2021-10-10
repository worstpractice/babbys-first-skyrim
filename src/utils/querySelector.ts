import type { QuerySelector } from 'src/typings/QuerySelector';

export const querySelector: QuerySelector = <T extends string>(id: T) => {
  const element = document.querySelector(id);

  if (!element) throw new ReferenceError(`No element with id "${id}"!`);

  return element;
};
