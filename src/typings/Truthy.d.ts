import type { Falsy } from 'src/typings/Falsy';

export type Truthy<T> = T extends Falsy ? never : T;
