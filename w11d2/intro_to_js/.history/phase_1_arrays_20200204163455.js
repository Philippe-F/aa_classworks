[].__proto__.uniq = function uniq () {
  let tempArr = [];
  this.forEach((l) => {
    if (!tempArr.includes(l)) {
      tempArr.push(l);
    }
  });
  return tempArr;
}

[].__proto__.twoSum = function twoSum () {

  return;
}