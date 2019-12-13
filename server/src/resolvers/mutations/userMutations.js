// Auth
export const login = async (_, {
  email, password,
}, { dataSources: { UserAPI } }) => UserAPI.login({
  email, password,
});

export const signup = async (_, {
  email, password, name,
}, { dataSources: { UserAPI } }) => UserAPI.signup({
  email, password, name,
});

export const updateUser = async (_, {
  email, name,
}, { dataSources: { UserAPI } }) => UserAPI.updateUser({
  email, name,
});
