import gql from 'graphql-tag';
import { BOOK_DATA } from './fragments';

export const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    book(_id: $bookId) {
      ...BookData
      isBooked
    }
  }
  ${BOOK_DATA}
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
    ...BookData
    }
  }
  ${BOOK_DATA}
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      _id
      name
    }
  }
`;

export const GET_AUTHOR = gql`
  query GetAuthor($authorId: ID!) {
    author(_id: $authorId) {
      _id
      name
      books {
        _id
        title
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    me {
      _id
      username
      books {
        _id
        title
      }
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query isLoggedIn { 
    isLoggedIn @client
  }
`;