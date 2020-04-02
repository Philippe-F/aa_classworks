import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOK } from '../../graphql/queries';
import { ProtectedComponent } from '../../utils/component_util';
import { BorrowBookButton, ReturnBookButton } from './BookButtons';


export default ({ bookId }) => {
  const { data, loading, error } = useQuery(
    GET_BOOK,
    {
      variables: {
        bookId
      }
    })

  if (loading) return <h1> Loading...</h1>
  if (error) return <h1> Error </h1>
  if (!data) return <h1> This book does not exist! </h1>

  if (data.book) {
    console.log(`in book details: book is booked: ${data.book.isBooked}`)
    return (
      <div>
      <h1>{data.book.title}</h1>
      <h1>{data.book.author.name}</h1>
      <h1>{data.book.isBooked}</h1>
      {!data.book.isBooked && <ProtectedComponent>
        <BorrowBookButton bookId={data.book._id} />  
      </ProtectedComponent>}
      
      {data.book.isBooked && <ProtectedComponent>
        <ReturnBookButton bookId={data.book._id} />  
      </ProtectedComponent>}
      </div>
    )
  }
}