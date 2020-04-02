import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { RETURN_BOOK } from '../../graphql/mutations';
import { CURRENT_USER } from '../../../../../book_lending/book-lending-client/src/graphql/queries';

export default ({ bookId }) => {
  const [returnBook, { data }] = useMutation(RETURN_BOOK);

  return (
    <button onClick={() => returnBook(
      { 
        variables: { id: bookId },
        onError() {},
        update(cache, { data: {returnBooks: { book }}}) {
          const data = cache.readQuery({ query: CURRENT_USER });
          const me = Object.assign({}, data.me);
          me.books = me.books.concat(me.books, [books[0]]);
          cache.writeQuery({ query: CURRENT_USER, data: { me }});
        }
      })}>
      Return Book
    </button>   
  )
};