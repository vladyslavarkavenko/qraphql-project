import pubsub from '../../pubsub';
import { PUBSUB_MESSAGE } from '../../const';

const {
  CHAT_CREATED,
  CHAT_UPDATED,
  CHAT_DELETED,
} = PUBSUB_MESSAGE;

export const createChat = async (
  _,
  {
    name, img, anonymous, participants,
  },
  { dataSources: { ChatAPI } },
) => {
  const chat = await ChatAPI.create(
    name, img, anonymous, participants,
  );

  pubsub.publish(CHAT_CREATED, {
    chatCreated: chat,
  });

  return chat;
};

export const updateChat = async (
  _,
  {
    chatId, name, img, anonymous, participants,
  },
  { dataSources: { ChatAPI } },
) => {
  const chat = await ChatAPI.update(
    chatId, name, img, anonymous, participants,
  );

  pubsub.publish(CHAT_UPDATED, {
    chatUpdated: chat,
  });

  return chat;
};


export const deleteChat = async (
  _,
  { chatId },
  { dataSources: { ChatAPI } },
) => {
  const chat = await ChatAPI.delete(chatId);

  pubsub.publish(CHAT_DELETED, {
    chatDeleted: chat,
  });

  return chat;
};
