[].__proto__.myBubbleSort = function myBubbleSort() {
  for (let i = 0; i < this.length - 1; i++) {
    (this[i] > this[i + 1]) ? [this[i], this[i + 1]] = [this[i + 1], this[i]] : null
  };
  for (let i = 0; i < this.length - 1; i++) {
    if (this[i] > this[i + 1]) {
      return this.myBubbleSort();
    };
  };
  return this;
};

"".__proto__.substrings = function substrings() {
  results = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j <= i; j++) {
      results.push(this.slice(j, i+1));  
      
    };
  };
  
  return results;
};