import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER } from '../../graphql/queries';
import { Link } from 'react-router-dom';

export default () => {
  const {data, loading, error} = useQuery(CURRENT_USER, {networkPolicy: 'network-only'}); 

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>
  if (!data.me) return <h1>You are not logged in</h1>

  if (data.me) {
    return(
      <>
        <h1>Welcome {data.me.username}</h1>
        <h4>List of borrowed books:</h4>
        <ul>
          {data.me.books && data.me.books.map(book => {
            return (
              <li key={book._id}>
                <Link to={`/books/${book._id}`}>{book.title}</Link>
              </li>
            );
          })}
        </ul>
      </>
    )
  }
}