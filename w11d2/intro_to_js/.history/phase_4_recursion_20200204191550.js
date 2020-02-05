const range = function range(start,end) {
  results = [];

  if (start == end) {
    return [start]
  } else {
    results.push(start);
    results.concat(range(start++, end))
  }

  return results;
};