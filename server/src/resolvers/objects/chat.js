async function participants({ id }, __, { dataSources: { userAPI } }) {
  const chat = await userAPI.getChat(id);

  return chat.getParticipants();
}

export default { participants };
