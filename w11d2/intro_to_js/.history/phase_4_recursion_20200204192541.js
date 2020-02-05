const range = function range(start,end) {
  results = [];

  // debugger;

  if (start == end) {
    return [end]
  } else {
    results.push(start);
    start++
    results.concat(range(start, end))
  }

  return results;
};