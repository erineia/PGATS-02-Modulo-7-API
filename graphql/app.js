const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { authenticate } = require('./auth');

const app = express();
app.use(express.json());

async function createApp() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = authenticate(req);
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
  return app;
}

module.exports = createApp;
