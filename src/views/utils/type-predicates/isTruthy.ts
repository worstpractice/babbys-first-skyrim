/* eslint-disable no-implicit-coercion */
import type { Truthy } from 'src/views/typings/Truthy';

export const isTruthy = <T>(value: T): value is Truthy<T> => {
  return !!value;
};
