const mongoose = require("mongoose");
const Category = mongoose.model("Category");

const typeDefs = `  
type Category {
  _id: ID!
  name: String!
  products: [Product]
}
extend type Query {
  categories: [Category]
  category(_id: ID!): Category
}
extend type Mutation {
  createCategory(name: String!): Category
  deleteCategory(_id: ID!): Category
}`;

const resolvers = {
  Category: {
    products(parentValue, _) {
      return Product.find({ category: parentValue._id });
    }
  },
  Query: {
    categories(_, __) {
      return Category.find({});
    },
    category(_, { _id }) {
      return Category.findById(_id);
    }
  },

  Mutation: {
    createCategory(_, { name }) {
      const newCategory = new Category({ name: name });
      return newCategory.save();
    },
    deleteCategory(_, { _id }) {
      const category = Category.findById(_id);
      category.remove();
      return category;
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
