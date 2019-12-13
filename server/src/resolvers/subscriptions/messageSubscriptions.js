import { withFilter } from 'apollo-server';

import pubsub from '../../pubsub';
import { PUBSUB_MESSAGE } from '../../const';

const {
  MESSAGE_CREATED,
  MESSAGE_UPDATED,
  MESSAGE_DELETED,
} = PUBSUB_MESSAGE;

export const messageCreated = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(MESSAGE_CREATED),
    (payload, args) => payload.chatId === args.chatId,
  ),
};

export const messageUpdated = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(MESSAGE_UPDATED),
    (payload, args) => payload.chatId === args.chatId,
  ),
};

export const messageDeleted = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(MESSAGE_DELETED),
    (payload, args) => payload.chatId === args.chatId,
  ),
};
