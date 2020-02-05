const range = function range(start,end) {
  let result = [];

  // debugger;

  if (start == end) {
    return [end]
  } else {
    result.push(start);
    start++
    r = range(start, end)
    result.concat(r)
  }

  return result;
};