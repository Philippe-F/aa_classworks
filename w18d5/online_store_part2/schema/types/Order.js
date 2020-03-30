const mongoose = require("mongoose");
const Order = mongoose.model("Order");

const typeDefs = `
  type Order {
    _id: ID!
    user: User
    products: [Product]
  }
  extend type Query {
    orders: [Order]
    order(_id: ID!): Order
  }`;

const resolvers = {
  Order: {
    user: async (parentValue, _) => {
      const order = await parentValue.populate("user").execPopulate();
      return order.user;
    },
    products: async (parentValue, _) => {
      const order = await parentValue.populate("products").execPopulate();
      return order.products;
    }
  },

  Query: {
    orders(_, __) {
      return Order.find({});
    },
    order(_, { _id }) {
      return Order.findById(_id);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
