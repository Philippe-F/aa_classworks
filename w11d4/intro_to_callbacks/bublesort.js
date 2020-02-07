const readline = require('readline');

const reader = readline.createInterface({ 
  input: process.stdin,
  output: process.stdout
});

function askIfGreaterThan(el1, el2, callback){
    reader.question(`is ${el1} greater than ${el2} answer [yes or no]:`, (res) => {
        callback(res === 'yes')
    })
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {

    if (i === arr.length - 1){
        return outerBubbleSortLoop(madeAnySwaps)
    }

    askIfGreaterThan(arr[i], arr[i+1], (res_boolean) => {
        if (res_boolean){
            const first = arr[i] 
            arr[i] = arr[i+1]
            arr[i+1] = first
            madeAnySwaps = true
        }
        innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop)
    })
}

// let arr = [3, 2, 1]
// innerBubbleSortLoop(arr, 0, false, function(madeAnySwaps) {
//     console.log("made a swap?:", madeAnySwaps, arr);
//   });

function absurdBubbleSort(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        // Begin an inner loop if you made any swaps. Otherwise, call
        // `sortCompletionCallback`.
        if (madeAnySwaps){
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop)

        } else {
            sortCompletionCallback(arr)
        }
    }

    // Kick the first outer loop off, starting `madeAnySwaps` as true.
    outerBubbleSortLoop(true)
}

function sortCompletionCallback(arr) {
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
}

absurdBubbleSort([3, 2, 1], sortCompletionCallback);