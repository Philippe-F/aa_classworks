// Work through this problem on https://leetcode.com/problems/climbing-stairs/ and use the specs given there.
// Feel free to use this file for scratch work.

function climbStairs(n) {
  if (n <= 2) return n;

  let seq = [1, 1, 2];

  for (let i = 0; i < n - 1; i++) {
    seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
  }

  return seq[n];
}

console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(4)); // 5
console.log(climbStairs(6)); // 13
