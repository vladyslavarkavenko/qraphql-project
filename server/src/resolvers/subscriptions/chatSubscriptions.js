import { withFilter } from 'apollo-server';

import pubsub from '../../pubsub';
import { PUBSUB_MESSAGE } from '../../const';

const {
  CHAT_CREATED,
  CHAT_UPDATED,
  CHAT_DELETED,
} = PUBSUB_MESSAGE;

export const chatCreated = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(CHAT_CREATED),
    (payload, _, context) => payload.userId === context.userId,
  ),
};

export const chatUpdated = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(CHAT_UPDATED),
    (payload, _, context) => payload.userId === context.userId,
  ),
};

export const chatDeleted = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(CHAT_DELETED),
    (payload, _, context) => payload.userId === context.userId,
  ),
};
