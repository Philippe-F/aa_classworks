import React from 'react';
import ReactDOM from 'react-dom';
import { fetchAllPokemon } from '../frontend/util/api_util';
import { receiveAllPokemon } from './actions/pokemon_actions';
import { requestAllPokemon } from './actions/pokemon_actions';
import configureStore from './store/store'; 
import { selectAllPokemon } from './reducers/selectors';
import { Root } from './components/root'; 


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const rootEl = document.getElementById('root');

  window.receiveAllPokemon = receiveAllPokemon;
  window.requestAllPokemon = requestAllPokemon;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.selectAllPokemon = selectAllPokemon;
  
ReactDOM.render(<Root store={store}/>, rootEl);
});