import { DataSource } from 'apollo-datasource';

import { TE } from '../../utils';
import { checkAuth, checkMsgPermissions, checkChatPermissions } from './helpers';

class MessageAPI extends DataSource {
  constructor({ models }) {
    super();

    this.models = models;
    this.checkMsgPermissions = checkMsgPermissions.bind(this);
    this.checkChatPermissions = checkChatPermissions.bind(this);
  }

  initialize(config) {
    this.ctx = config.context;
  }

  async get(msgId) {
    const userId = checkAuth(this.ctx);
    const message = await this.checkMsgPermissions(msgId);

    try {
      await message.removeView(userId); // In case we already have that one.
      await message.addView(userId);
    } catch (err) {
      TE(err);
    }

    return message;
  }

  async create({
    text, chatId, attachment, attachmentType,
  }) {
    let message;
    const { Message } = this.models;
    const userId = checkAuth(this.ctx);
    const chat = await this.checkChatPermissions(chatId);

    try {
      message = await Message.create({
        text, attachment, attachmentType,
      });

      await message.setOwner(userId);
      await chat.addMessages([message]);
    } catch (err) {
      TE(err);
    }

    message.chat = chat;
    return message;
  }

  async update({
    msgId, text, attachment, attachmentType,
  }) {
    const message = await this.checkMsgPermissions(msgId, true);

    try {
      await message.update({
        text, attachment, attachmentType, isEdited: true,
      });
    } catch (err) {
      TE(err);
    }

    return message;
  }

  async delete(msgId) {
    const message = await this.checkMsgPermissions(msgId, true);

    try {
      await message.destroy();
    } catch (err) {
      TE(err);
    }

    return message;
  }
}

export default MessageAPI;
