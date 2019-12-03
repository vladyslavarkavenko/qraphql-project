async function me(_, __, { dataSources: { userAPI } }) {
  return userAPI.getUser();
}

export default { me };
