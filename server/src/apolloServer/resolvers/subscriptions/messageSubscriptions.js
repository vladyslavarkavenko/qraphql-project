import { withFilter } from 'apollo-server';

import { pubsub } from '../../globals';
import { PUBSUB } from '../../../const';

const { MESSAGES } = PUBSUB.MESSAGE;

// eslint-disable-next-line import/prefer-default-export
export const messages = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(MESSAGES),
    (
      { messages: { data: { chat: { participants } } } },
      _,
      { userId },
    ) => participants.find(({ id }) => id === userId),
  ),
};
