// eslint-disable-next-line import/prefer-default-export
export const Chat = async (
  _, { chatId }, { dataSources: { ChatAPI } },
) => ChatAPI.getChat(chatId);
