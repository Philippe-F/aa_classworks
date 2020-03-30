const mongoose = require("mongoose");
const Product = mongoose.model("Product");

const typeDefs = `
type Product {
  _id: ID!
  name: String!
  description: String
  category: Category
  price: Float
}
extend type Query {
  products: [Product]
  product(_id: ID!): Product
}
extend type Mutation {
  createProduct(name: String!, description: String, price: Float, category: String): Product
  deleteProduct(_id: ID!): Product
  updateProductCategory(_id: ID!, category: String!): Product
}`;

const resolvers = {
  Product: {
    category: async (parentValue, _) => {
      const product = await parentValue.populate("category").execPopulate();
      return product.category;
    }
  },

  Query: {
    products(_, __) {
      return Product.find({});
    },
    product(_, { _id }) {
      return Product.findById(_id);
    }
  },

  Mutation: {
    createProduct: async (_, product) => {
      const existingCategory = await Category.findOne({
        name: product.category
      });
      let newCategory;
      if (existingCategory) {
        product.category = existingCategory._id;
      } else {
        newCategory = new Category({ name: product.category });
        await newCategory.save();
        product.category = newCategory._id;
      }
      const newProduct = new Product(product);
      return newProduct.save();
    },

    deleteProduct(_, { _id }) {
      const product = Product.findById(_id);
      product.remove();
      return product;
    },

    updateProductCategory: async (_, { _id, category }) => {
      let product = await Product.findById(_id);
      const existingCategory = await Category.findOne({
        name: category
      });
      let newCategory;
      if (existingCategory) {
        product.category = existingCategory._id;
      } else {
        newCategory = new Category({ name: product.category });
        await newCategory.save();
        product.category = newCategory._id;
      }
      return product.save();
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
