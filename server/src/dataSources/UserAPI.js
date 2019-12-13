import { DataSource } from 'apollo-datasource';

import { ERROR } from '../const';
import { checkAuth } from './helpers';
import { TE, jwt, pass } from '../utils';

const { INVALID_CREDENTIALS } = ERROR;

class UserAPI extends DataSource {
  constructor({ models }) {
    super();

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

  async update({ email, name }) {
    let user;
    const { User } = this.models;
    const id = checkAuth(this.ctx);

    try {
      [user] = await User.update(
        { email, name },
        { where: { id } },
      );
    } catch (err) {
      TE(err);
    }

    return user;
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

  async signup({ email, password, name }) {
    let user;
    const { User } = this.models;

    try {
      user = await User.create({
        name,
        email,
        password: pass.hash(password),
      });
    } catch (err) {
      TE(err);
    }

    return { user, token: jwt.create(user) };
  }
}

export default UserAPI;
