import { withFilter } from 'apollo-server';

import { PUBSUB } from '../../../const';
import { queue, pubsub } from '../../globals';

const { MESSAGE: { CHATS, MATCH_FOUND } } = PUBSUB;

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

export const startAnonymousChat = {
  subscribe: async (parent, args, context) => {
    const { minAge, maxAge, sex } = args;
    const { dataSources: { ChatAPI, UserAPI } } = context;

    const searcher = await UserAPI.get();

    const data = {
      searcher,
      search: { minAge, maxAge, sex },
    };

    const match = queue.findMatchAndDelete(data);

    if (match) {
      const participants = [match.searcher.id, searcher.id];

      const chat = await ChatAPI.create({ participants, anonymous: true });
      chat.participants = participants;

      setTimeout(() => pubsub.publish(MATCH_FOUND, { startAnonymousChat: chat }));
    } else {
      queue.add(data);
    }

    return withFilter(
      () => pubsub.asyncIterator(MATCH_FOUND),
      ({ startAnonymousChat: { participants } }) => participants.indexOf(searcher.id) !== -1,
    )(parent, args, context);
  },
};
