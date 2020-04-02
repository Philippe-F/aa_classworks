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
  BorrowBooks($id: ID) {
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