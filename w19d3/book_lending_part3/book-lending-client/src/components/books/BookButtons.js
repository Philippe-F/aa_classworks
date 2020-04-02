import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RETURN_BOOK, BORROW_BOOK } from '../../graphql/mutations';
import { CURRENT_USER } from '../../graphql/queries';


const BookButton = ({ bookId, action, mutation, found }) => {
  const [bookAction, { data }] = useMutation(mutation);

  const bookData = action === "Return" ? "returnBooks" : "borrowBooks";

  return (
    <button onClick={() => bookAction(
      { 
        variables: { id: bookId },
        onError() {},
        update(cache, { data: {[bookData]: { books }}}) {
          const data = cache.readQuery({ query: CURRENT_USER });
          const me = Object.assign({}, data.me);
          if (action === "Return") {
            // me.books = me.books.filter(e => e._id !== bookId);
            me.books.splice(found, 1);
          } else {
            me.books = me.books.concat([books[0]]);
          }

          cache.writeQuery({ query: CURRENT_USER, data: { me }});
        }
      })}>
      {action} Book
    </button>
  )
}

export const ReturnBookButton = ({ bookId }) => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  if (loading || error) return null;

  const currentUser = data && data.me;
  const found = currentUser.books.findIndex(e => e._id === bookId);
  
  return <BookButton bookId={bookId} action={"Return"} mutation={RETURN_BOOK} found={found} />;
};


export const BorrowBookButton = ({ bookId }) => (
  <BookButton bookId={bookId} action={"Borrow"} mutation={BORROW_BOOK} />
);
