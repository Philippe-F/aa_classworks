import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';


document.addEventListener('DOMContentLoaded', function(event){
    const main = document.getElementById('root');

    ReactDOM.render(<Root />, main);
})