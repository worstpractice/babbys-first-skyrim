import type { Falsy } from 'src/views/typings/Falsy';

export type Truthy<T> = T extends Falsy ? never : T;
