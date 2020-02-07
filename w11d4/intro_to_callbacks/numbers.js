const readline = require('readline');

const reader = readline.createInterface({ 
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, cb) {
  if (numsLeft > 0) {
    reader.question("pick a number ", function(res){
      const input = parseInt(res) 
      sum += input 
      console.log(sum) 
      numsLeft--  
      addNumbers(sum, numsLeft, cb) 
    })  
  } else {
    cb(sum) 
  }
}


addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));