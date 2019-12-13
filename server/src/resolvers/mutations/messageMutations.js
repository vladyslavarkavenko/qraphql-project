import pubsub from '../../pubsub';
import { PUBSUB_MESSAGE } from '../../const';

const {
  MESSAGE_CREATED,
  MESSAGE_UPDATED,
  MESSAGE_DELETED,
} = PUBSUB_MESSAGE;

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

  pubsub.publish(MESSAGE_CREATED, {
    messageCreated: message,
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

  pubsub.publish(MESSAGE_UPDATED, {
    messageUpdated: message,
  });

  return message;
};

export const deleteMessage = async (
  _,
  { msgId },
  { dataSources: { MessageAPI } },
) => {
  const message = await MessageAPI.delete(msgId);

  pubsub.publish(MESSAGE_DELETED, {
    deleteMessage: message,
  });

  return message;
};
