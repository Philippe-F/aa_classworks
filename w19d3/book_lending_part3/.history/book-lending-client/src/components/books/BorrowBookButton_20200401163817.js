import React from 'react';
import { BORROW_BOOK } from '../../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';

export default ({ bookId }) => {
  const [borrowBook, { data }] = useMutation(BORROW_BOOK);

  return (
    <button onClick={() => borrowBook({ variables: { id: bookId }})}>
      Borrow Book
    </button>   
  )

}