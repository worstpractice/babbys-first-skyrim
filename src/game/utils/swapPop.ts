/** WARNING: Only usable on UNORDERED lists!
 *
 * Pros:
 * - Highly performant single-item removal from ANYWHERE (!) in the target array
 *
 * Cons:
 * - Jumbles the positions of items in the array!
 */
export const swapPop = <T>(targetIndex: number, array: T[]): T | undefined => {
  const lastIndex = array.length - 1;

  const targetItem = array[targetIndex] as T;
  const lastItem = array[lastIndex] as T;

  // Swap
  array[targetIndex] = lastItem;
  array[lastIndex] = targetItem;

  // Pop
  return array.pop();
};
