// eslint-disable-next-line import/prefer-default-export
export const me = async (
  _, __, { dataSources: { UserAPI } },
) => UserAPI.getUser();

export const User = async (
  _, { userId, email }, { dataSources: { UserAPI } },
) => UserAPI.getUser(userId, email);
