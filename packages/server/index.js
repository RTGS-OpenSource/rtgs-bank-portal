import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './typeDefs.js';

const isMocked = process.env.MOCKED;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  mocks: !!isMocked,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
