import { DataSource } from 'apollo-datasource';

import { TE } from '../utils';
import { checkAuth, checkChatPermissions } from './helpers';

class ChatAPI extends DataSource {
  constructor({ models }) {
    super();

    this.models = models;
    this.checkChatPermissions = checkChatPermissions.bind(this);
  }

  initialize(config) {
    this.ctx = config.context;
  }

  async getChat(chatId) {
    return this.checkChatPermissions(chatId);
  }

  async createChat(name, img, anonymous, participants) {
    let chat;
    const { Chat } = this.models;
    const userId = checkAuth(this.ctx);

    try {
      chat = await Chat.create({ name, img, anonymous });

      await chat.setOwner(userId);

      const participantsIds = participants.map((a) => +a);
      await chat.setParticipants([...new Set([...participantsIds, userId])]);
    } catch (err) {
      TE(err);
    }

    return chat;
  }

  async updateChat(chatId, name, img, anonymous, participants) {
    const userId = checkAuth(this.ctx);

    const chat = await this.checkChatPermissions(chatId, true);
    try {
      await chat.update({ img, name, anonymous });

      if (participants) {
        const participantsIds = participants.map((a) => +a);
        const users = [...new Set([...participantsIds, userId])];

        await chat.setParticipants(users);
      }
    } catch (err) {
      TE(err);
    }

    return chat;
  }

  async deleteChat(chatId) {
    const chat = await this.checkChatPermissions(chatId, true);

    return !!await chat.destroy();
  }
}

export default ChatAPI;
