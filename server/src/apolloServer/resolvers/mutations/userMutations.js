import { pubsub } from '../../globals';
import { PUBSUB } from '../../../const';

const {
  MESSAGE: { USERS },
  MESSAGE_TYPES: { USER_UPDATED, USER_DELETED },
} = PUBSUB;

export const login = async (
  _,
  { email, password },
  { dataSources: { UserAPI } },
) => UserAPI.login({
  email, password,
});

export const signup = async (
  _,
  {
    email, password, name, avatar, sex, birthday,
  },
  { dataSources: { UserAPI } },
) => UserAPI.signup({
  email, password, name, avatar, sex, birthday,
});

export const refresh = async (
  _,
  refreshToken,
  { dataSources: { UserAPI } },
) => UserAPI.refresh(refreshToken);

export const deleteUser = async (
  _,
  __,
  { dataSources: { UserAPI } },
) => {
  const user = UserAPI.delete();

  pubsub.publish(USERS, {
    users: {
      type: USER_DELETED,
      data: user,
    },
  });

  return user;
};

export const updateUser = async (
  _,
  {
    email, name, avatar, sex, birthday, friends,
  },
  { dataSources: { UserAPI } },
) => {
  const user = UserAPI.update({
    email, name, avatar, sex, birthday, friends,
  });

  pubsub.publish(USERS, {
    users: {
      type: USER_UPDATED,
      data: user,
    },
  });

  return user;
};
