import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from 'apollo-link';
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import gql from "graphql-tag";
import { typeDefs, resolvers } from './resolvers';
import { CURRENT_USER } from './queries'


const createClient = async () => {
  const cache = new InMemoryCache({ dataIdFromObject: object => object._id });

  const links = [];

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.group("\x1b[31m%s\x1b[0m", "[GraphQL error] ", "Message: ", message);
        console.log("Location: ", locations);
        console.log("Path: ", path);
        console.log("Extensions: ", extensions)
        console.groupEnd();
      });
    }
    if (networkError) console.log("\x1b[31m%s\x1b[0m", "[Network error]:", networkError);
  });
  links.push(errorLink);

  const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql',
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  links.push(httpLink);

  const client = new ApolloClient({
    cache,
    link: ApolloLink.from(links),
    typeDefs,
    resolvers
  });

  if (process.env.NODE_ENV === "development") {
    window.client = client;
    window.gql = gql;
  }

  client.onResetStore(() => {
    localStorage.clear();
  });
  
  if (localStorage.getItem("token")) {
    const { data } = await client.query({query: CURRENT_USER});
    console.log(data);
    if (!data || !data.me) client.resetStore();
  }
  
  return await client;
};




export default createClient;