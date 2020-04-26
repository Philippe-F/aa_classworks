function getDigitFrom(num, place){
    let digit = 0;
    for(let i = 0; i < place; i ++){
        digit = num % 10;
        num = Math.floor(num/10);
    }
    return digit;
}

// function getIntLength(num){
//     let count = 1;
//     while (num/10 > 1){
//         num = num/10;
//         count++;
//     }
//     return count;
// }

const getIntLength = (num) => (num === 0) ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1;

function getMaxDigits(nums){
    const lengths = nums.map((num) => getIntLength(num));
    return Math.max(...lengths);
}

function radixSort(arr) {
    if (!Array.isArray(arr)) return null;
    if (arr.length < 1) return [];

    let maxDigits = getMaxDigits(arr);

    for (j = 0; j < maxDigits; j++) {
        let buckets = Array.from({ "length": 10 }, () => [])
        for (let i = 0; i < arr.length; i++) {
            let num = arr[i];
            let digit = getDigitFrom(num, j+1)
            buckets[digit].push(num);
        }
        arr = [].concat(...buckets);
    }

    return arr;
}

module.exports = {
    radixSort
};