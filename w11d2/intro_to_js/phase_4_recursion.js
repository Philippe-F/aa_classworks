const range = function range(start,end) {
  let result = [];

  // debugger;

  if (start == end) {
    return [end]
  } else {
    result.push(start);
    result = result.concat(range(start + 1, end))
  }

  return result;
};