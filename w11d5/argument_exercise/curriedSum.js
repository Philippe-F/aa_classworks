let _curriedSum = curriedSum(2); // 6  
_curriedSum(2); // 6  

// let curriedSumTwo = curriedSum.bind(this, 2)

function curriedSum(numberOne) {
  const count = numberOne;
  let numbers = [];

  return function (numberTwo) {
    numbers.push(numberTwo);

    if (numbers.length === count) {
      const reducer = (accumulator, current) => accumulator + current;
      console.log(numbers.reduce(reducer)); 
    };
  };
}

// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;

// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));