import { withFilter } from 'apollo-server';

import { pubsub } from '../../globals';
import { PUBSUB } from '../../../const';

const { USERS } = PUBSUB.MESSAGE;

// eslint-disable-next-line import/prefer-default-export
export const users = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(USERS),
    (
      { users: { data: { id } } },
      { watch },
    ) => watch.indexOf(id.toString()) !== -1,
  ),
};
