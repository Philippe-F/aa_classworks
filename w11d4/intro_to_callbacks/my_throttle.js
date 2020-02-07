Function.prototype.myThrottle = function(interval){
    let tooSoon = false

    return () => {
        if (!tooSoon) {
            tooSoon = true
    
            setTimeout(() => {
                tooSoon = false
            }, interval)
            this()
        } else {
            console.log("can not fire yet")
        }
    }
}

class Neuron {
    constructor() {
      this.fire = this.fire.myThrottle(5000);
    }
  
    fire() {
      console.log("Firing!");
    }
}

let n = new Neuron()
n.fire()
n.fire()