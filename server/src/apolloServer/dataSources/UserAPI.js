import { DataSource } from 'apollo-datasource';

import { TE } from '../../utils';
import { ERROR } from '../../const';
import { jwt, pass } from './userAPI';
import { checkAuth } from './helpers';

const { UNAUTHENTICATED, PERMISSION_DENIED, NOT_FOUND } = ERROR;

// TODO: Split this somehow.
class UserAPI extends DataSource {
  constructor({ models }) {
    super();

    this.timers = {};
    this.models = models;
  }

  initialize(config) {
    this.ctx = config.context;
  }

  async get({ userId, email } = {}) {
    let user;
    let where;
    const { User } = this.models;

    if (userId) {
      user = { id: userId };
    } else if (email) {
      where = { email };
    } else {
      where = { id: checkAuth(this.ctx) };
    }

    try {
      [user] = await User.findAll({ where });
    } catch (err) {
      TE(err);
    }

    return user;
  }

  async update({
    sex,
    name,
    email,
    avatar,
    online,
    lastSeen,
    birthday,
  }) {
    let user;

    try {
      user = await this.get();

      await user.update({
        sex,
        name,
        email,
        online,
        avatar,
        lastSeen,
        birthday,
      });
    } catch (err) {
      TE(err);
    }

    return user;
  }

  async delete() {
    let user;

    try {
      user = await this.get();
      // TODO: Remove user from "friends" of other users.
      // TODO: Remove all user's friendRequests.
      // TODO: Remove all chats and messages.

      await user.destroy();
    } catch (err) {
      TE(err);
    }

    return user;
  }

  async setOnline(online = true) {
    return this.update({ online });
  }

  async login({ email, password }) {
    let user;

    try {
      user = await this.get({ email });
    } catch (err) {
      TE(err);
    }

    if (!user || !pass.compare(password, user.password)) {
      TE(UNAUTHENTICATED);
    }

    return { user, tokens: await jwt.create(user) };
  }

  async signup({
    email, password, name, avatar, birthday, sex,
  }) {
    let user;
    const { User } = this.models;

    try {
      user = await User.create({
        sex,
        name,
        email,
        avatar,
        birthday,
        password: pass.hash(password),
      });
    } catch (err) {
      TE(err);
    }

    return { user, tokens: await jwt.create(user) };
  }

  async refresh(refreshToken) {
    let user;
    const { User } = this.models;

    jwt.verify(refreshToken);
    try {
      [user] = await User.findAll({
        where: { refreshToken },
      });
    } catch (err) {
      TE(err);
    }

    if (!user) {
      TE(UNAUTHENTICATED);
    }

    const tokens = await jwt.create(user);

    try {
      await user.update({ refreshToken: tokens.refreshToken });
    } catch (err) {
      TE(err);
    }

    return { user, tokens };
  }

  async sendFriendRequest({ senderId = checkAuth(this.ctx), receiverId, text }) {
    let friendRequest;
    const { FriendRequest } = this.models;

    try {
      friendRequest = await FriendRequest.create({ text });

      await friendRequest.setReceiver(receiverId);
      await friendRequest.setSender(senderId);
    } catch (err) {
      TE(err);
    }

    return friendRequest;
  }

  async acceptFriendRequest(requestId) {
    let friendRequest;
    const userId = checkAuth(this.ctx);
    const { FriendRequest } = this.models;

    try {
      [friendRequest] = await FriendRequest.findAll({
        where: { id: requestId },
      });
      if (!friendRequest) {
        TE(NOT_FOUND);
      }

      const receiver = await friendRequest.getReceiver();
      if (receiver.id !== userId) {
        TE(PERMISSION_DENIED);
      }
      const sender = await friendRequest.getSender();

      await sender.addFriend(receiver.id);
      await receiver.addFriend(sender.id);

      await friendRequest.destroy();
    } catch (err) {
      TE(err);
    }

    return friendRequest;
  }

  async deleteFriend(friendId) {
    let user;

    try {
      user = await this.get();
      const friend = await this.get({ userId: friendId });

      await user.removeFriend(friendId);
      await friend.removeFriend(user.id);
    } catch (err) {
      TE(err);
    }

    return user;
  }
}

export default UserAPI;
