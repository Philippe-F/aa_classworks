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
    returnBooks(bookIds: [$id])  {
      success
      message
      books {
        _id
      }
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String, $author: ID) {
    createBook(title: $title, author: $author) {
      success
      message
      books {
        _id
      }
    }
  }
`;
