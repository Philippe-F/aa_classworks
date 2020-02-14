// window.$1 = $1;
const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function (sel){ 
  if (sel instanceof HTMLElement) {
    return new DOMNodeCollection([sel]);
  } else {
    const elementList = document.querySelectorAll(sel); 
    const array = Array.from(elementList);  
    return new DOMNodeCollection(array);
  }
}
