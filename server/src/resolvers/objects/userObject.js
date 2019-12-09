function password() {
  return 'PRIVATE DATA';
}

async function chats(_, __, { dataSources: { UserAPI } }) {
  const user = await UserAPI.getUser();

  return user.getChats();
}

export default { password, chats };
