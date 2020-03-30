const mongoose = require("mongoose");
const User = mongoose.model("User");
const typeDefs = `
type User {
    _id: ID!
    email: String!
    orders: [Order]
}
type UserCredentials {
    _id: ID!
    email: String!
    token: String!
}

extend type Mutation {
    signup(email: String!, password: String!): UserCredentials
}
  `;

const resolvers = {
  User: {
    orders(parentValue, _) {}
  },
  Mutation: {
    signup(_, { email, password }) {
      return User.signUp(email, password);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
