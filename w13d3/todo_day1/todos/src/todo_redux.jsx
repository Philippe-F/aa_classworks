import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux' 
import store from './store/store' 

const App = () => {
    return <h1>Todo App</h1>
}

window.store = store;
render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("main")
  );

