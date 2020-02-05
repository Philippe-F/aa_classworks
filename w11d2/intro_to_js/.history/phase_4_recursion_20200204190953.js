const range = function range(start,end) {
  results = [];
  
  temp = start;

  if (temp < end) {
    results.push(temp);
    range(temp++, end)
  } else {
    return results;
  }

  
};