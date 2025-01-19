const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
      _id: ID!
      name: String
      email: String!
      avatar: String
      bio: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        updateUser(name: String, email: String!, avatar: String, bio: String): User
    
    }
`
module.exports = typeDefs;

