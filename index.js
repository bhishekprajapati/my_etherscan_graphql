const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

const resolvers = {
  Query: {
    etherBalanceByAddress: (
      root,
      _args,
      { dataSources } // Get ether balance for an address
    ) => dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (
      root,
      _args,
      { dataSources } // Get total ether supply
    ) => dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (
      root,
      _args,
      { dataSources } // Get latest ETH price
    ) => dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (
      root,
      _args,
      { dataSources } // Get average block confirmation time
    ) => dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0 to disable timeouts
server.timeout = 0;
// Start the server on port 9000
server.listen("9000").then(({ url }) => {
  // Log the URL when ready
  console.log(`🚀 Server ready at ${url}`);
});
