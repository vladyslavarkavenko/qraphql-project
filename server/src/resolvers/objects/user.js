function password() {
  return 'PRIVATE DATA';
}

async function chats(_, __, { dataSources: { userAPI } }) {
  const user = await userAPI.getUser();

  return user.getChats();
}

export default { password, chats };
