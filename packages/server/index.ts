import 'graphql-import-node';
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { resolvers } from './resolvers';
import * as typeDefs from './schema.graphql';

const isMocked = process.env.MOCKED;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: 'bounded',
  mocks: !!isMocked,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
