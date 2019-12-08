import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server';

import CONFIG from './config';

import store from './store';
import models from './models';
import resolvers from './resolvers';
import UserAPI from './datasources/user';

import typeDefs from './schema.graphql';

const { PORT, JWT_SECRET } = CONFIG;

const context = ({ req }) => {
  const Authorization = req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, JWT_SECRET);

    return { isAuthorized: true, userId };
  }

  return { isAuthorized: false };
};

store.sync();
// console.log('store', store);
console.log('models', store.models);
const server = new ApolloServer({
  context,
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: new UserAPI({ models }),
  }),
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀Server running at ${url}`);
});
