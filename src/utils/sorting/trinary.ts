/** A sort with 3 possible values (trinary).
 *
 * Apparently enables all kinds of optimizations.
 *
 * See: https://www.youtube.com/watch?v=zVevl-K-m7Y */
export const trinary = <T>(a: T, b: T) => {
  /** The positive result (1) indicates a change in order is needed.
   *
   * Both the negative result (-1) and the even result (0) mean no change needed.
   *
   * `sort(trinary)` loops over the array, applying the comparison to each consecutive pair of elements for as many iterations are needed.
   *
   * This process repeats until no more changes are needed (read: until all comparisons of consecutive pairs produces a negative result).
   */
  return a > b ? 1 : b > a ? -1 : 0;
};
