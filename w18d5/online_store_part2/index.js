const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to mongo"))
  .catch(e => console.log(e));

require("./models");
const { schema, resolvers } = require("./schema");
const graphQLHTTP = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;

app.use(
  "/graphql",
  graphQLHTTP({
    schema: schema,
    rootValue: resolvers
  })
);
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
app.get("/hello", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
