class Lamp {
  constructor() {
    this.name = "a lamp";
    this.process = {
        title: "now lamp context"
    }
  }
}

const turnOn = function () {
    console.log("current ctx", this.process['title'])
    console.log("Turning on " + this.name);
};

const lamp = new Lamp();

console.log("turn on fail")
turnOn(); // should not work the way we want it to

Function.prototype.myBind = function (context) {
  return () => {

    this.apply(context) 
  }
}

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

console.log("bound turn on")
boundTurnOn(); // should say "Turning on a lamp"
console.log("my bound turn on")
myBoundTurnOn(); // should say "Turning on a lamp"