class DOMNodeCollection{
  constructor(collection){
    this.collection = collection;
  }

  html(string){
    if (typeof string !== 'undefined'){
      for(let i=0; i < this.collection.length; i++){
        this.collection[i].innerHTML = string;
      };
    } else {
      return this.collection[0].innerHTML;
    };
  }

  empty(){
    for (let i = 0; i < this.collection.length; i++) {
      this.collection[i].html = "";
    }
  }

  append(){

  }
}

module.exports = DOMNodeCollection;