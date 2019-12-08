import validator from 'validator';
import { DataSource } from 'apollo-datasource';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import CONFIG from '../config';

const { JWT_SECRET } = CONFIG;

// TODO: Add jwt expiration time.

// Helpers
const success = (data) => ({
  success: true,
  data,
});
const failure = (error, { log = true } = {}) => {
  const isServerError = typeof error !== 'string';

  if (log && isServerError) {
    console.log('ERROR:', error);
  }

  return ({
    success: false,
    error: isServerError ? 'SERVER_ERROR' : error,
  });
};

class UserAPI extends DataSource {
  constructor({ models }) {
    super();

    this.models = models;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createUser({ email, password, name }) {
    // TODO: Check if email is free.
    if (!validator.isEmail(email)) {
      return failure('INVALID_DATA');
    }

    try {
      const { User } = this.models;

      return await User.create({ email, password, name });
    } catch (err) {
      throw new Error('SERVER_ERROR');
    }
  }

  async login({ email, password }) {
    const { User } = this.models;

    const [user] = await User.findAll({
      where: { email },
    });

    if (!user) {
      return failure('INVALID_CREDENTIALS');
    }

    let isPassValid;
    try {
      isPassValid = await bcrypt.compare(password, user.password);
    } catch (err) {
      return failure(err);
    }
    if (!isPassValid) {
      return failure('INVALID_CREDENTIALS');
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return success({ user, token });
  }

  async signup({ email, password, name }) {
    const { User } = this.models;

    let user;
    try {
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });
    } catch (err) {
      failure(err);
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return success({ user, token });
  }

  async getUser({ email } = {}) {
    let user;
    const { User } = this.models;

    if (email) {
      try {
        [user] = await User.findAll({
          where: { email },
        });
      } catch (err) {
        return failure(err);
      }
    } else {
      const { isAuthorized, userId: id } = this.context;

      if (!isAuthorized) {
        return failure('UNAUTHENTICATED');
      }

      try {
        [user] = await User.findAll({
          where: { id },
        });
      } catch (err) {
        return failure(err);
      }
    }

    return success(user);
  }

  async getChat(chatId) {
    const { isAuthorized, userId } = this.context;

    if (!isAuthorized) {
      return failure('UNAUTHENTICATED');
    }

    let chat;
    let participants;

    try {
      const { Chat } = this.models;

      [chat] = await Chat.findAll({
        where: {
          id: chatId,
        },
      });

      participants = await chat.getParticipants();
    } catch (err) {
      return failure(err);
    }

    if (participants.findIndex(({ id }) => id === userId) === -1) {
      return failure('PERMISSION_DENIED');
    }

    return success(chat);
  }

  async createChat({
    name, img, anonymous = true, participants,
  }) {
    const { isAuthorized, userId } = this.context;

    if (!isAuthorized) {
      return failure('UNAUTHENTICATED');
    }

    try {
      const { Chat } = this.models;

      const chat = await Chat.create({ name, img, anonymous });

      await chat.setOwner(userId);
      await chat.setParticipants([...new Set([...participants, userId].map((a) => +a))]);

      return success(chat);
    } catch (err) {
      return failure(err);
    }
  }
}

export default UserAPI;
