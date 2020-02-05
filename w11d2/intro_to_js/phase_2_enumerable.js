[].__proto__.myEach = function myEach (callback) {

  for (let i=0; i < this.length; i++) {
    callback(this[i]);
  };

};

[].__proto__.myMap = function myMap (callback) {
  results = [];

  this.myEach(function map(l) {
    results.push(callback(l));
  });

  return results;
};

[].__proto__.myReduce = function myReduce (callback, initial) {
  if (typeof initial === 'undefined') {
    initial = this[0];
    arr = this.slice(1, this.length);
  } else {
    arr = this;
  }

  let temp = initial;

  arr.myEach(function(l) {
     temp = callback(temp, l);
  });

  return temp;
};