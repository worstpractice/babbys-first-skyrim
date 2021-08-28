export const deduplicate = <T>(array: readonly T[]): readonly T[] => {
  return [...new Set<T>(array)] as const;
};
