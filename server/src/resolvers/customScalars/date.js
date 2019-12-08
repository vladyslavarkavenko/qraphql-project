import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const DATE = new GraphQLScalarType({
  name: 'Date',
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
  parseValue(v) {
    return new Date(v);
  },
  serialize(v) {
    return typeof v === 'string' ? v : v.toISOString();
  },
});

export default DATE;
