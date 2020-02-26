import React from 'react'; 
import { Provider } from 'react-redux'; 
import PokemonIndexContainer from './pokemon/pokemon_index_container';  

export const Root = ({ store }) => {
  return <Provider store={store}>
    <div>Hello Young World!</div>
    <PokemonIndexContainer /> 
  </Provider>
};
