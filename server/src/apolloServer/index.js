import { ApolloServer } from 'apollo-server';

import context from './context';
import typeDefs from './schema';
import resolvers from './resolvers';
import dataSources from './dataSources';
import subscriptions from './subscriptions';

const apolloServer = new ApolloServer({
  context,
  typeDefs,
  resolvers,
  dataSources,
  subscriptions,
});

export default apolloServer;
