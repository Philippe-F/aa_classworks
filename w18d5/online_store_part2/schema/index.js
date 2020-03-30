const mongoose = require("mongoose");
const types = require("./types"); // [{},{}]
const { merge } = require("lodash");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
const Order = mongoose.model("Order");
const { makeExecutableSchema } = require("graphql-tools");

const otherTypeDefs = `

  type Query {
    _empty: Boolean
  } 

  type Mutation {
    _empty: Boolean   
  }
`;

const typeDefs = [...types.map(type => type.typeDefs), otherTypeDefs];
const resolvers = merge(...types.map(type => type.resolvers));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = {
  schema,
  typeDefs,
  resolvers
};
