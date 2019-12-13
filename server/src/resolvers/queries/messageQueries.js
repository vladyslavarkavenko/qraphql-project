// eslint-disable-next-line import/prefer-default-export
export const Message = async (
  _, { msgId }, { dataSources: { MessageAPI } },
) => MessageAPI.getMessage(msgId);
