import type { ObSet } from 'obset';
import type { TypePredicate } from 'src/game/typings/TypePredicate';

export type TestSetPair<T extends string> = readonly [TypePredicate<T>, ObSet<T>];
