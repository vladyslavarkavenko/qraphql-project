async function participants({ id }, __, { dataSources: { ChatAPI } }) {
  const chat = await ChatAPI.getChat(id);

  return chat.getParticipants();
}

export default { participants };
