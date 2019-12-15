import { withFilter } from 'apollo-server';

import pubsub from '../../pubsub';
import { PUBSUB } from '../../const';

const { CHATS } = PUBSUB.MESSAGE;

// If we haven't "watch" argument, watch for all available user's chats.
// eslint-disable-next-line import/prefer-default-export
export const chats = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(CHATS),
    (
      { chats: { data: { id, participants } } },
      { watch },
      { userId },
    ) => (
      watch
        ? watch.indexOf(id.toString()) !== -1
        : !!participants.find((user) => user.id === userId)
    ),
  ),
};
