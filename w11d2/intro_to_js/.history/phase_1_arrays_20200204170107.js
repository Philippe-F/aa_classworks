[].__proto__.uniq = function uniq () {
  let tempArr = [];
  this.forEach((l) => {
    if (!tempArr.includes(l)) {
      tempArr.push(l);
    }
  });
  return tempArr;
};

[].__proto__.twoSum = function twoSum () {
  results = [];

  for (let i = 0; i < this.length; i++) {
    
    for (let j=i+1; j < this.length; j++) {
      (this[i] + this[j] === 0) ? results.push([i,j]) : null
    };
  };

  return results;
};

[].__proto__.transpose = function transpose () {
  if (!(this.every((el) => {el instanceof Array}) && 
    this.every((el) => {el.length === this[0].length}))) {
      throw "All elements must be equally sized arrays" 
    };
};



