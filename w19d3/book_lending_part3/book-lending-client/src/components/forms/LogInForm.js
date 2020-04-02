import React from 'react';
import { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../../graphql/mutations';
import { IS_LOGGED_IN, CURRENT_USER } from '../../graphql/queries';

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loginUser, {loading, error}] = useMutation(
    LOGIN_USER, 
      {
        variables: {
          username,
          password
        },
        update(cache, { data: {login} }){
          if (!login) setErrorMessage('Invalid Credentials');
          else {
            // we can either write to the cache directly or refetch the IS_LOGGED_IN query so other components will update properly
            // cache.writeData({ data: { isLoggedIn: login.loggedIn }});
            localStorage.setItem('token', login.token);
          }
        },
        onError() {
          setErrorMessage('Something went wrong');
        },
        refetchQueries: [{ query: CURRENT_USER }, { query: IS_LOGGED_IN }]
      }
  )

  return (
    <>
    <h1> {errorMessage} </h1>
    <form onSubmit={(e) => {
      e.preventDefault();
      loginUser();
    }}>
      <input type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Login" disabled={loading} />
    </form>
    </>
  )

};