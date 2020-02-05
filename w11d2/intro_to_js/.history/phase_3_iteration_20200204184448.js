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