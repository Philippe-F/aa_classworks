
class Clock {
    constructor(){
        this.date = new Date();
        this.printTime();
        setInterval( () => { this._tick() }, 1000)
    }

    printTime(){
        console.log(`${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`);   
    }

    _tick(){
        this.date.setSeconds(this.date.getSeconds() + 1);
        this.printTime();
    }
}