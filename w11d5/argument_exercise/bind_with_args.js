class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

// This is the function
Function.prototype.myBind = function(context) {
  // the context is the function we are calling my bind on
  let args = [];

  for (let i = 1; i < arguments.length; i++) { args.push(arguments[i]) };
  const that = this

  return function() {
    that.apply( context, args.concat( Array.from(arguments) ) ); 
  };
}

const markov = new Cat("Markov"); 
const pavlov = new Dog("Pavlov");