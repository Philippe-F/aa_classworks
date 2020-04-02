const mongoose = require('mongoose');
const { makeExecutableSchema } = require('graphql-tools');

const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Author = mongoose.model('Author');

const typeDefs = `
  type Book {
    _id: ID!
    title: String
    isBooked: Boolean!
    author: Author
  }
  type Author {
    _id: ID!
    name: String
    books: [Book]
  }
  type User {
    _id: ID!
    username: String!
    books: [Book]
  }
  type Query {
    books: [Book]
    book(_id: ID!): Book
    me: User
    authors: [Author]
    author(_id: ID!): Author
  }
  type Mutation {
    borrowBooks(bookIds: [ID]!): BookUpdateResponse!
    returnBooks(bookIds: [ID]!): BookUpdateResponse!
    createBook(title: String, author: ID!): BookUpdateResponse!
    deleteBook(bookId: ID!): BookUpdateResponse!
    login(username: String!, password: String!): UserCredentials
  }
  type BookUpdateResponse {
    success: Boolean!
    message: String
    books: [Book]
  }
  type UserCredentials {
    _id: ID!
    username: String!
    token: String
    loggedIn: Boolean
  }
`;

const resolvers = {
  Query: {
    books(_, __) {
      return Book.find({});
    },
    book(_, { _id }) {
      return Book.findById(_id);
    },
    me(_, __, context) {
      // context.user is the logged-in user
      return context.user;
    },
    authors(_, __) {
      return Author.find({});
    },
    author(__, {_id}) {
      return Author.findById(_id);
    }
  },
  Mutation: {
    deleteBook: async(_, { bookId }, context) => {
      const loggedInUser = context.user;
      if (!loggedInUser) return {
        success: false,
        message: 'Need to log in to delete books',
        books: []
      };

      const book = await Book.findByIdAndDelete(bookId, ((err, res) => {
        if (err) return {
          success: false,
          message: 'err',
          books: []
        }
        return {
          su
        }
      }));

      console.log(book);
    },
    createBook: async (_, { title, author }, context) => {
      const loggedInUser = context.user;
      if (!loggedInUser) return {
        success: false,
        message: 'Need to log in to create books',
        books: []
      }

      const foundAuthor = await Author.findById(author);

      if (foundAuthor === null) return {
        success: false,
        message: 'Author does not exist',
        books: []
      }

      return Book.createBook({title, author: author._id});
    },
    borrowBooks(_, { bookIds }, context) {
      const loggedInUser = context.user;
      if (!loggedInUser) return {
        success: false,
        message: 'Need to log in to borrow books',
        books: []
      }
      return Book.borrowBooks(bookIds, loggedInUser);
    },
    returnBooks: async (_, { bookIds }, context) => {
      const loggedInUser = context.user;
      if (!loggedInUser) return {
        success: false,
        message: 'Need to log in to return books',
        books: []
      }
      // const book = await Book.findById(bookId);
      // return book.returnBook(loggedInUser);
      return Book.returnBooks(bookIds, loggedInUser);
    },
    login(_, { username, password }) {
      // login method used in MERN project
      return User.login(username, password);
    }
  },
  User: {
    books: async (parentValue, _, context) => {
      const queriedUser = parentValue;
      const loggedInUser = context.user;
      // only return the borrowed books of a user if the queried user is the logged in user
      if (loggedInUser && queriedUser._id === loggedInUser._id) {
        await loggedInUser.populate('books').execPopulate();
        return loggedInUser.books;
      }
      return null;
    }
  },
  Author: {
    books(parentValue, _) {
      const author = parentValue;
      // find all the books who have the queried author as their author
      return Book.find({ author: author._id });
    }
  },
  Book: {
    author: async (parentValue, _) => {
      const book = parentValue;
      await book.populate('author').execPopulate();
      return book.author;
    }
  }
}

module.exports = {
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: { log: e => console.log('\x1b[31m%s\x1b[0m', e.message) }
  }),
  typeDefs,
  resolvers
}