function countingSort(arr, max) {
    if (arr.length <= 1) return arr;
    let counter = new Array(max + 1).fill(0);
    const sorted = [];

    for (let i = 0; i < arr.length; i++) {
        counter[arr[i]] += 1;
    }

    for (let i = 0; i < counter.length; i++) {
        for (let j = 0; j < counter[i]; j++) {
            sorted.push(i);
        }
    }

    return sorted;
}


module.exports = {
    countingSort
};