import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const resolvers = {
  // for data that only exists in the frontend
  Query: {
    isLoggedIn: () => {
      console.log('isLoggedIn resolver called') // comment this in to see when this resolver function is called
      return !!localStorage.getItem("token");
    }
  }
};

