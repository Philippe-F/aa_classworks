import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from '../graphql/queries';

export const ProtectedComponent = ({ component: Component }) => {
  const { data, error } = useQuery(IS_LOGGED_IN);
  
  if (data && data.isLoggedIn) {
    return <Component />
  }
  
  error && console.log(error);
  return null;
}
