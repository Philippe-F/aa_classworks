const range = function range(start,end) {
  result = [];

  // debugger;

  if (start == end) {
    return [end]
  } else {
    result.push(start);
    start++
    result.concat(range(start, end))
  }

  return result;
};