import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHOR } from '../../graphql/queries';

export default ({ authorId }) => {
  const {data, loading, error} = useQuery(
    GET_AUTHOR,
    {
      variables: {
        authorId
      }
    });

  if (loading) return <h1> Loading...</h1>
  if (error) return <h1> Error </h1>
  if (!data) return <h1> This author does not exist </h1>
  
    const list = data.author.books.length >= 1 ? 
       (
        <ul>
          {data.author.books.map(book => {
            return <li key={book._id}>{book.title}</li>
        })} 
        </ul> 
    ) : <h1> This author has no books. </h1>


  
  if (data.author) {
    return (
      <div>
        <h1>{data.author.name}</h1>
        {list}
      </div>
    )
  }
}