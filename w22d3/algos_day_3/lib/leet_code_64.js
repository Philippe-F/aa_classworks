// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

function minPathSum(grid) {
  let row = grid[0].length;
  let column = grid.length;

  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      if (i > 0 && j > 0) grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
      else if (i > 0) grid[i][j] += grid[i - 1][j];   
      else if (j > 0) grid[i][j] += grid[i][j - 1];
    }
  }

  return grid[column - 1][row - 1]; 
}

console.log(minPathSum([
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
])) // 7

console.log(minPathSum([
  [
    [1, 2, 5],
    [3, 2, 1]
  ]
])) // 


// Input: [
//   [1, 3, 1],
//   [1, 5, 1],
//   [4, 2, 1]
// ]
// Output: 7
// Explanation: Because the path 1→ 3→ 1→ 1→ 1 minimizes the sum.
