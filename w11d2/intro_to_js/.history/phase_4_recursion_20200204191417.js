const range = function range(start,end) {
  results = [];

  if (start < end) {
    results.push(start);
    results.concat(range(start++, end))
  }

  return results;
};