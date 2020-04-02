import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LogIn($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      username
      token
      loggedIn
    }
  }
`;

export const BORROW_BOOK = gql`
  mutation BorrowBooks($id: ID) {
    borrowBooks(bookIds: [$id]) {
      success
      message
      books {
        _id
        title
        isBooked
        author {
          _id
          name
        }
      }
    }
  }
`;

export const RETURN_BOOK = gql`
  mutation ReturnBook($id: ID!) {
    returnBook(bookId: $id)  {
      success
      message
      books {
        _id
      }
    }
  }
`;
