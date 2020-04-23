// Work through this problem on https://leetcode.com/problems/coin-change-2/ and use the specs given there.
// Feel free to use this file for scratch work.

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */

var change = function (amount, coins, memo = {}) {
  
  if (amount === 0) return 1;
  if (coins.length === 0) return 0;
  let key = amount + "-" + coins;
  if (key in memo) return memo[key];
  
  let currentCoin = coins[coins.length - 1];
  let total = 0;

  for (let qty = 0; qty * currentCoin <= amount; qty++) {
    total += change(amount - qty * currentCoin, coins.slice(0, -1), memo);
  }
  
  memo[key] = total;  
  return total;
};

// amount = 3

// coins = [1, 2] 

// [1, 1, 1]
// [1, 2]