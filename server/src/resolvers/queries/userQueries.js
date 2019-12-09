// eslint-disable-next-line import/prefer-default-export
export const me = async (_, __, { dataSources: { UserAPI } }) => UserAPI.getUser();
