// Auth
import pubsub from '../../pubsub';
import { PUBSUB } from '../../const';

const {
  MESSAGE: { USERS },
  MESSAGE_TYPES: { USER_UPDATED, USER_DELETED },
} = PUBSUB;

export const login = async (_, {
  email, password,
}, { dataSources: { UserAPI } }) => UserAPI.login({
  email, password,
});

export const online = async (_, __, { dataSources: { UserAPI } }) => UserAPI.online(
  (user) => {
    console.log('user', user);
    debugger;
    pubsub.publish(USERS, {
      users: {
        type: USER_UPDATED,
        data: user,
      },
    });
  },
);

export const signup = async (_, {
  email, password, name, avatar,
}, { dataSources: { UserAPI } }) => UserAPI.signup({
  email, password, name, avatar,
});

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

export const updateUser = async (_, {
  email, name, avatar,
}, { dataSources: { UserAPI } }) => {
  const user = UserAPI.update({
    email, name, avatar,
  });

  pubsub.publish(USERS, {
    users: {
      type: USER_UPDATED,
      data: user,
    },
  });

  return user;
};
