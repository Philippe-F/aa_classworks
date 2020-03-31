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