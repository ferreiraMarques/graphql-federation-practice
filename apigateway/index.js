const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");

const run = async () => {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [{ name: "accounts", url: "http://localhost:4001/graphql" }],
    }),
  });

  const server = new ApolloServer({ gateway, subscriptions: false });

  const { url } = await startStandaloneServer(server);
  console.log(`🚀  Server ready at ${url}`);
};

run();
