const range = function range(start,end) {
  results = [];

  debugger;

  if (start == end) {
    return [start]
  } else {
    results.push(start);
    newStart = start++
    results.concat(range(newStart, end))
  }

  return results;
};