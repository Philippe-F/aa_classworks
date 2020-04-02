import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { RETURN_BOOK, BORROW_BOOK } from '../../graphql/mutations';
import { CURRENT_USER } from '../../../../../book_lending/book-lending-client/src/graphql/queries';


const BookButton = ({ bookId, action, mutation }) => {
  const [bookAction, { data }] = useMutation(mutation);

  return (
    <button onClick={() => bookAction(
      { 
        variables: { id: bookId },
        onError() {},
        update(cache, { data: {returnBooks: { books }}}) {
          const data = cache.readQuery({ query: CURRENT_USER });
          const me = Object.assign({}, data.me);
          me.books = me.books.concat(me.books, [books[0]]);
          cache.writeQuery({ query: CURRENT_USER, data: { me }});
        }
      })}>
      {action} Book
    </button>
  )
}

export const ReturnBookButton = ({ bookId }) => (
  <BookButton bookId={bookId} action={"Return"} mutation={RETURN_BOOK} />
);

export const BorrowBookButton = ({ bookId }) => (
  <BookButton bookId={bookId} action={"Borrow"} mutation={BORROW_BOOK} />
);