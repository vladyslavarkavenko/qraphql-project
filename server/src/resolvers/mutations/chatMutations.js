import pubsub from '../../pubsub';
import { PUBSUB } from '../../const';

const {
  MESSAGE: { CHATS },
  MESSAGE_TYPES: { CHAT_CREATED, CHAT_UPDATED, CHAT_DELETED },
} = PUBSUB;

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

  pubsub.publish(CHATS, {
    chats: {
      type: CHAT_CREATED,
      data: chat,
    },
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

  pubsub.publish(CHATS, {
    chats: {
      type: CHAT_UPDATED,
      data: chat,
    },
  });

  return chat;
};


export const deleteChat = async (
  _,
  { chatId },
  { dataSources: { ChatAPI } },
) => {
  const chat = await ChatAPI.delete(chatId);

  pubsub.publish(CHATS, {
    chats: {
      type: CHAT_DELETED,
      data: chat,
    },
  });

  return chat;
};
