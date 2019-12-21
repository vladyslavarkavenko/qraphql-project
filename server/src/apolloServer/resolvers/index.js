import Query from './queries';
import Objects from './objects';
import Mutation from './mutations';
import Subscription from './subscriptions';
import CustomScalars from './customScalars';

export default {
  Query,
  Mutation,
  ...Objects,
  Subscription,
  ...CustomScalars,
};
