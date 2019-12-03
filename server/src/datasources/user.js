import validator from 'validator';
import { DataSource } from 'apollo-datasource';

class UserAPI extends DataSource {
  constructor({ store }) {
    super();

    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createUser({ email, password, name }) {
    const { User } = this.store;
    // TODO: Check if email is free.

    if (!validator.isEmail(email)) {
      return null;
    }

    try {
      return await User.create({ email, password, name });
    } catch (err) {
      console.log('ERR', err);
      return null;
    }
  }

  async getUser() {
    const { User } = this.store;
    const { isAuthorized, userId } = this.context;

    if (!isAuthorized) {
      return null;
    }

    try {
      const users = await User.findAll({
        where: {
          id: userId,
        },
      });

      return users[0];
    } catch (err) {
      console.log('ERR', err);
      return null;
    }
  }

  // async findOrCreateUser({ email: emailArg } = {}) {
  //   const email =
  //     this.context && this.context.user ? this.context.user.email : emailArg;
  //   if (!email || !isEmail.validate(email)) return null;
  //
  //   const users = await this.store.User.findOrCreate({ where: { email } });
  //   return users && users[0] ? users[0] : null;
  // }
}

export default UserAPI;
