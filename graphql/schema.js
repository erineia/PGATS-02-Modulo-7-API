const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    favorecidos: [String!]!
    amount: Float!
  }

  type Transfer {
    from: String!
    to: String!
    amount: Float
    date: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    user: [User!]!
    transfers: [Transfer!]!
  }

  type Mutation {
    registerUser(
      username: String!
      password: String!
      favorecidos: [String!]
    ): User!
    loginUser(username: String!, password: String!): AuthPayload!
    createTransfer(from: String!, to: String!, amount: Float!): Transfer
  }
`;

module.exports = typeDefs;
