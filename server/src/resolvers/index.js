import Query from './queries';
import Objects from './objects';
import Mutation from './mutations';
import CustomScalars from './customScalars';

export default {
  Query,
  Mutation,
  ...Objects,
  ...CustomScalars,
};
