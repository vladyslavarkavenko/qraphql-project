import types from './types.graphql';
import models from './models.graphql';
import queries from './queries.graphql';
import mutations from './mutations.graphql';
import connections from './connections.graphql';
import subscriptions from './subscriptions.graphql';

const schema = [types, models, connections, queries, mutations, subscriptions].join('\n');

export default schema;
