export const createMessage = async (
  _,
  {
    text, chatId, attachment, attachmentType,
  },
  { dataSources: { MessageAPI } },
) => MessageAPI.createMessage(
  text, chatId, attachment, attachmentType,
);

export const updateMessage = async (
  _,
  {
    msgId, text, attachment, attachmentType,
  },
  { dataSources: { MessageAPI } },
) => MessageAPI.updateMessage(
  msgId, text, attachment, attachmentType,
);

export const deleteMessage = async (
  _,
  { msgId },
  { dataSources: { MessageAPI } },
) => MessageAPI.deleteMessage(msgId);
