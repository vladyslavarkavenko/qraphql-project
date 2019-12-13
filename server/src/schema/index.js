import types from './types.graphql';
import models from './models.graphql';
import queries from './queries.graphql';
import mutations from './mutations.graphql';
import connections from './connections.graphql';

export default [types, models, connections, queries, mutations].join('\n');
