const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");

const mogoose = require("mongoose");

const { resolvers } = require("./resolvers");
const { typeDefs } = require("./models/typedefs");

const MONGO_URL = "mongodb://localhost:27017/student-register";

const { encode, decodeToken } = require("./config/jwt");

try {
  mogoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

const run = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    }),
    formatError: (error) => {
      return {
        message: error.message,
        code: error.extensions.code,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization,
      }),
    })
  );

  await httpServer.listen({ port: 4001 }, () => {});

  console.log("run server");

  console.log(await encode());
};

run();
