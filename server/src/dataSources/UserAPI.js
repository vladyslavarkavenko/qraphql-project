import { DataSource } from 'apollo-datasource';

import { ERROR } from '../const';
import { checkAuth } from './helpers';
import { TE, jwt, pass } from '../utils';

const { UNAUTHENTICATED } = ERROR;

class UserAPI extends DataSource {
  constructor({ models }) {
    super();

    this.timers = {};
    this.models = models;
  }

  initialize(config) {
    this.ctx = config.context;
  }

  async get(userId, email) {
    let user;
    const { User } = this.models;

    try {
      if (userId) {
        [user] = await User.findAll({
          where: { id: userId },
        });
      } else if (email) {
        [user] = await User.findAll({
          where: { email },
        });
      } else {
        const id = checkAuth(this.ctx);

        [user] = await User.findAll({
          where: { id },
        });
      }
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
    friends,
    birthday,
  }) {
    let user;
    const { User } = this.models;
    const id = checkAuth(this.ctx);

    try {
      [user] = await User.findAll(
        { where: { id } },
      );

      await user.update({
        sex,
        name,
        email,
        online,
        avatar,
        lastSeen,
        birthday,
      });

      if (friends) {
        await user.setFriends([...new Set(friends.map((a) => +a))]);
      }
    } catch (err) {
      TE(err);
    }

    return user;
  }

  async delete() {
    let user;
    const { User } = this.models;
    const id = checkAuth(this.ctx);

    try {
      [user] = await User.findAll({
        where: { id },
      });
      await user.destroy();
    } catch (err) {
      TE(err);
    }

    return user;
  }

  async online(onUpdate) {
    const period = 60 * 1000;

    const lastSeen = Date.now();
    const id = checkAuth(this.ctx);

    if (!this.timers[id]) {
      const user = await this.update({ online: true });

      if (onUpdate) onUpdate(user);
    }

    this.timers[id] = setTimeout(
      async () => {
        const user = await this.update({ online: false, lastSeen });

        this.timers[id] = null;
        if (onUpdate) onUpdate(user);
      },
      period,
    );

    return period - 60 * 1000;
  }

  async login({ email, password }) {
    let user;
    const { User } = this.models;

    try {
      [user] = await User.findAll({
        where: { email },
      });
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

  async refresh({ refreshToken }) {
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
}

export default UserAPI;
