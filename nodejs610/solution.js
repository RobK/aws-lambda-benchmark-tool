/**
 * Given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.
 *  - N is an integer within the range [1..100,000]
 *  - Each element of array A is an integer within the range [−1,000,000..1,000,000].
 * @param {Array} a - The arrary to operate on
 * @returns {Number} number - The smallest positive integer (greater than 0) that does not occur in A.
 */
module.exports = (a) => {
  const length = a.length;
  const map = Array(length).fill(false);
  for (let i = 0; i < length; i++) {
    const item = a[i];
    if (item < 1 || item > length) {
      continue;
    }
    map[item - 1] = true;
  }
  for (let i = 0; i < length; i++) {
    if (!map[i]) {
      return i + 1;
    }
  }
  return length + 1;
}