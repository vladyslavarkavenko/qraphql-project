const login = async (_, {
  email, password,
}, { dataSources: { userAPI } }) => userAPI.login({
  email, password,
});

const signup = async (_, {
  email, password, name,
}, { dataSources: { userAPI } }) => userAPI.signup({
  email, password, name,
});

const createChat = async (_, {
  name, img, anonymous, participants,
}, { dataSources: { userAPI } }) => userAPI.createChat({
  name, img, anonymous, participants,
});

export default { login, signup, createChat };
