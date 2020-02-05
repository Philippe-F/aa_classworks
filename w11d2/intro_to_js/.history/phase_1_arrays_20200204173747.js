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
  if (!(this.every((el) => {return Array.isArray(el)}) && 
    this.every((el) => {return el.length === this[0].length}))) {
      throw "All elements must be equally sized arrays" 
  };

  results = [];

  for (let i = 0; i < this[0].length; i++) {
    tempArr = [];
    for (let j = 0; j < this.length; j++) {
      tempArr.push(this[j][i]);
    };
    results.push(tempArr);
  };
  return results; 
};

[].__proto__.myEach = function myEach (callback) {
  for (let i=0; i < this.length; i++) {
    // debugger;
    callback(this[i]);
  };
};

[].__proto__.myMap = function myMap (callback) {
  results = [];

  this.myEach(function map (l) {
    debugger;
    results.push(callback(l));
  });

  return results;
};