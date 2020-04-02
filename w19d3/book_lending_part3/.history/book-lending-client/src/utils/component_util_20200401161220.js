import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from '../graphql/queries';

export const ProtectedComponent = ({ children }) => {
  const { data, error } = useQuery(IS_LOGGED_IN);
  
  if (data && data.isLoggedIn) {
    return <>{children}</>
  }
  
  error && console.log(error);
  return null;
}

export const AuthComponent = ({ component: Component, ...rest }) => {
  const { data, error } = useQuery(IS_LOGGED_IN);
  
  if (data && data.isLoggedIn === false) {
    return <Component {...rest} />;
  }
  
  error && console.log(error);
  return null;
}
