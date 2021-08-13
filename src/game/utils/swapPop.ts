export const swapPop = <T>(targetArray: T[], targetIndex: number, preserveOrder?: boolean): T | undefined => {
  const { length } = targetArray;

  // * Short-circuit #1
  if (!length) return;

  const isValidIndex = targetIndex > -1 && targetIndex < length;

  // * Short-circuit #2
  if (!isValidIndex) return;

  const lastIndex = length - 1;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Pop *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const poppedElement = targetArray.pop();

  if (targetIndex === lastIndex) {
    /** NOTE: `poppedElement` was the `targetElement`. Job done, including any order-preservation (since the array is now empty). */

    // * Short-circuit #3
    return poppedElement;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Swap *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** NOTE: we extract the real target element from the array. */
  const targetElement = targetArray[targetIndex];

  if (!preserveOrder) {
    /** NOTE: `poppedElement` was just some unrelated element occupying last place. We write it back to the `targetArray`, overwriting (and thereby repurposing) `targetIndex` in the process. */
    targetArray[targetIndex] = poppedElement as T;

    /** NOTE: the elements have now been jumbled in the `targetArray`. Since the caller did not explicitly pass `preserveOrder`, this was the desired outcome. */

    // * Short-circuit #4
    return targetElement;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Preserve Order *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let currentIndex = targetIndex;
  let nextIndex = targetIndex + 1;

  /** NOTE: when benchmarking worst-case performance for 2e6-element (read: very long) arrays, this `while`-based solution was ~75 times faster than `Array.prototype.copyWithin()`.  */
  while (nextIndex < length) {
    /** NOTE: we shift the discrepancy forward in the array.
     *
     * We end up with the (formerly) last element missing entirely from the array, and the (formerly) second-to-last element duplicated, occupying both last and second-to-last place. */
    targetArray[currentIndex++] = targetArray[nextIndex++] as T;
  }

  /** NOTE: recall that the last index has become one less than `lastIndex` (since popping `poppedElement`). */
  const newLastIndex = lastIndex - 1;

  /** NOTE: re-insert the element that used to be last into its former position, thus preserving the original order of the array (sans the freshly-popped element). */
  targetArray[newLastIndex] = poppedElement as T;

  return targetElement;
};
