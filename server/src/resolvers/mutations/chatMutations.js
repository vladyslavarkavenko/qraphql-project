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
