import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RETURN_BOOK, BORROW_BOOK } from '../../graphql/mutations';
import { CURRENT_USER } from '../../graphql/queries';


const BookButton = ({ bookId, action, mutation, found }) => {
  const [bookAction, { data }] = useMutation(mutation);

  return (
    <button onClick={() => bookAction(
      { 
        variables: { id: bookId },
        onError() {},
        update(cache, { data: {returnBooks: { books }}}) {
          const data = cache.readQuery({ query: CURRENT_USER });
          const me = Object.assign({}, data.me);
          if (action === "Return") {
            me.books = me.books.concat(me.books, [books[0]]);
          } else {
            me.books = books.splice(found, 1);
          }

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

export const BorrowBookButton = ({ bookId }) => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  if (loading || error) return null;
  const currentUser = data && data.currentUser;
  if (currentUser === undefined) return null;
  const found = currentUser.books.findIndex(e => e._id === bookId);

  return <BookButton bookId={bookId} action={"Borrow"} mutation={BORROW_BOOK} found={found} />
};