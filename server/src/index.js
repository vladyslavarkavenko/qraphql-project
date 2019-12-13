import { ApolloServer } from 'apollo-server';

import context from './context';
import typeDefs from './schema';
import resolvers from './resolvers';
import dataSources from './dataSources';

import { PORT } from './config';

const server = new ApolloServer({
  context,
  typeDefs,
  resolvers,
  dataSources,
});

server
  .listen({ port: PORT })
  .then(({ url }) => console.log(`🚀Server running: ${url}`));
