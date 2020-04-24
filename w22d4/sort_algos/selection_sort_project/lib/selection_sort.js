function swap(arr, index1, index2) {
  let currentEle = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = currentEle;
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let smallest = arr[i];

    for (let j = i + 1; j < arr.length; j++) {
      if (smallest > arr[j]) {
        swap(arr, j, i);
      }
    }
  }

  return arr;
}

module.exports = {
  selectionSort,
  swap,
};
