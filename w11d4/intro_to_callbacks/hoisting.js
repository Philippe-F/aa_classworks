function hoist(){
    var x = true
    this1 = this;
    console.log(this1)
    if(x){ 
      this2 = this;
        console.log(this2)
        let y = "hello"
    }
}
// hoist()

function That(name){
    debugger;
    this.name = name;
}

function This(name){
    debugger;
    this.name = name;
}