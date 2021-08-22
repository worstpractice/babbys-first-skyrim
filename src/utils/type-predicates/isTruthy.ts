/* eslint-disable no-implicit-coercion */
import type { Truthy } from 'src/typings/Truthy';

export const isTruthy = <T>(value: T): value is Truthy<T> => {
  return !!value;
};
