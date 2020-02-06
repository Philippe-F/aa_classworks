const range = function range(start,end) {
  let result = [];

  if (start == end) {
    return [end]
  } else {
    result.push(start);
    result = result.concat(range(start + 1, end))
  };

  return result;
};

function sumRec(arr) {
  let sum = 0;

  for (let i = 0; i < this.length; i++) {
    if (i === arr.length - 1) {
      return sum 
    } else {
      sum += arr[i];
      sumRec(arr.slice(i, arr.length - 1)) 
    };
  }; 

};

sumRec([1,2,3]) 