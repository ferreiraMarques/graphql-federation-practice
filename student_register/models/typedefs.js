const gql = require("graphql-tag");

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    greetings: String
    welcome(name: String!): String
    students: [Student]
    student(id: ID): Student
  }

  type Student @key(fields: "id") {
    id: ID
    firstName: String
    lastName: String
    age: Int
  }

  type Mutation {
    create(firstName: String, lastName: String, age: Int): Student
    update(id: ID, firstName: String, lastName: String, age: Int): Student
    delete(id: ID): Student
  }
`;

module.exports = { typeDefs };
