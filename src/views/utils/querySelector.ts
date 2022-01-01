import type { QuerySelector } from 'src/views/typings/QuerySelector';
import { panic } from 'src/views/utils/panic';

export const querySelector: QuerySelector = <T extends string>(id: T) => {
  return document.querySelector(id) || panic(`No element with id "${id}"!`);
};
