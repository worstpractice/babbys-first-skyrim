import { trinary } from 'src/utils/sorting/trinary';

export const deduplicate = <T>(array: readonly T[]): readonly T[] => {
  return [...new Set<T>(array.flat(Number.POSITIVE_INFINITY) as readonly T[])].sort(trinary);
};
