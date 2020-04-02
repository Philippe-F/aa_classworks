import React from 'react';
import { BORROW_BOOK } from '../../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER } from '../../../../../book_lending/book-lending-client/src/graphql/queries';

export default ({ bookId }) => {
  const [borrowBook, { data }] = useMutation(BORROW_BOOK);

  return (
    <button onClick={() => borrowBook(
      { 
        variables: { id: bookId },
        onError() {},
        update(cache, { data: {borrowBooks: { book }}}) {
          const data = cache.readQuery({ query: CURRENT_USER });
          const me = Object.assign({}, data.me);
          me.books = me.books.concat(me.books, [books[0]]);
          cache.writeQuery({ query: CURRENT_USER, data: { me }});
        }
      })}>
      Borrow Book
    </button>   
  )
};
