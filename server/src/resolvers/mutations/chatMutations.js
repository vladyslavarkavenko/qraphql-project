// Chat
export const createChat = async (
  _,
  {
    name, img, anonymous, participants,
  },
  { dataSources: { ChatAPI } },
) => ChatAPI.createChat(
  name, img, anonymous, participants,
);

export const updateChat = async (
  _,
  {
    chatId, name, img, anonymous, participants,
  },
  { dataSources: { ChatAPI } },
) => ChatAPI.updateChat(
  chatId, name, img, anonymous, participants,
);

export const deleteChat = async (
  _,
  { chatId },
  { dataSources: { ChatAPI } },
) => ChatAPI.deleteChat(chatId);

// Messages
export const updateMessage = async (
  _,
  {
    msgId, text, attachment, attachmentType,
  },
  { dataSources: { ChatAPI } },
) => ChatAPI.updateMessage(
  msgId, text, attachment, attachmentType,
);

export const createMessage = async (
  _,
  {
    text, chatId, attachment, attachmentType,
  },
  { dataSources: { ChatAPI } },
) => ChatAPI.createMessage(
  text, chatId, attachment, attachmentType,
);
