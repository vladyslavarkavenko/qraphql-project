import { DataSource } from 'apollo-datasource';

import { ERROR } from '../const';
import {
  TE,
  jwt,
  pass,
  checkAuth,
} from '../helpers';

const { INVALID_CREDENTIALS } = ERROR;

class UserAPI extends DataSource {
  constructor({ models }) {
    super();

    this.models = models;
  }

  initialize(config) {
    this.ctx = config.context;
  }

  async login({ email, password }) {
    let user;
    const { User } = this.models;

    try {
      [user] = await User.findAll({
        where: { email },
      });

      if (!user) {
        TE(INVALID_CREDENTIALS);
      }

      if (!pass.compare(password, user.password)) {
        TE(INVALID_CREDENTIALS);
      }
    } catch (err) {
      TE(err);
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

  async getUser({ email } = {}) {
    let user;
    const { User } = this.models;

    try {
      if (email) {
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
}

export default UserAPI;
