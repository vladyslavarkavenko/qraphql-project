import types from './types.graphql';
import models from './models.graphql';
import queries from './queries.graphql';
import mutations from './mutations.graphql';

export default [types, models, queries, mutations].join('\n');
