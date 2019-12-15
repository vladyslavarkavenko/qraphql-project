import { DataSource } from 'apollo-datasource';

import { ERROR } from '../const';
import { checkAuth } from './helpers';
import { TE, jwt, pass } from '../utils';

const { INVALID_CREDENTIALS } = ERROR;

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
    email, name, avatar, online, lastSeen,
  }) {
    let user;
    const { User } = this.models;
    const id = checkAuth(this.ctx);

    try {
      [user] = await User.findAll(
        { where: { id } },
      );

      await user.update({
        email, name, avatar, online, lastSeen,
      });
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

    if (!user) {
      TE(INVALID_CREDENTIALS);
    }

    if (!pass.compare(password, user.password)) {
      TE(INVALID_CREDENTIALS);
    }

    return { user, token: jwt.create(user) };
  }

  async signup({
    email, password, name, avatar,
  }) {
    let user;
    const { User } = this.models;

    try {
      user = await User.create({
        name,
        email,
        avatar,
        password: pass.hash(password),
      });
    } catch (err) {
      TE(err);
    }

    return { user, token: jwt.create(user) };
  }
}

export default UserAPI;
