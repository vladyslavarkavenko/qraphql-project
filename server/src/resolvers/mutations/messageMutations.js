import pubsub from '../../pubsub';
import { PUBSUB } from '../../const';

const {
  MESSAGE: { MESSAGES },
  MESSAGE_TYPES: { MESSAGE_CREATED, MESSAGE_UPDATED, MESSAGE_DELETED },
} = PUBSUB;

export const createMessage = async (
  _,
  {
    text, chatId, attachment, attachmentType,
  },
  { dataSources: { MessageAPI } },
) => {
  const message = await MessageAPI.create(
    text, chatId, attachment, attachmentType,
  );

  pubsub.publish(MESSAGES, {
    messages: {
      type: MESSAGE_CREATED,
      data: message,
    },
  });

  return message;
};

export const updateMessage = async (
  _,
  {
    msgId, text, attachment, attachmentType,
  },
  { dataSources: { MessageAPI } },
) => {
  const message = await MessageAPI.update(
    msgId, text, attachment, attachmentType,
  );

  pubsub.publish(MESSAGES, {
    messages: {
      type: MESSAGE_UPDATED,
      data: message,
    },
  });

  return message;
};

export const deleteMessage = async (
  _,
  { msgId },
  { dataSources: { MessageAPI } },
) => {
  const message = await MessageAPI.delete(msgId);

  pubsub.publish(MESSAGES, {
    messages: {
      type: MESSAGE_DELETED,
      data: message,
    },
  });
  return message;
};
