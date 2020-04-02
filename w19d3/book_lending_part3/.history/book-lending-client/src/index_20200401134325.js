import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "@apollo/react-hooks";
import createClient from './graphql/client';

const client = createClient()
  .then(res => {
    debugger
    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      document.getElementById("root")
    );
  })
  .catch(err => {debugger});

// debugger


// createClient().then(client => {
//   ReactDOM.render(
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>,
//     document.getElementById("root")
//   );
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
