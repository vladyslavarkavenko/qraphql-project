import { DataSource } from 'apollo-datasource';

import { ERROR } from '../const';
import { checkAuth, TE } from '../helpers';

const { PERMISSION_DENIED, NOT_FOUND } = ERROR;

// TODO: Add ownerId and chatId different logic for checkChatPermissions.
// TODO: Add ownerId for Message so we know who can update it.

const checkChatPermissions = async (chat, userId) => {
  if (!chat) {
    TE(NOT_FOUND);
  }

  const participants = await chat.getParticipants();
  if (participants.findIndex(({ id }) => id === userId) === -1) {
    TE(PERMISSION_DENIED);
  }

  return participants;
};

class ChatAPI extends DataSource {
  constructor({ models }) {
    super();

    this.models = models;
  }

  initialize(config) {
    this.ctx = config.context;
  }

  async getChat(chatId) {
    let chat;
    const { Chat } = this.models;
    const userId = checkAuth(this.ctx);

    try {
      [chat] = await Chat.findAll({
        where: {
          id: chatId,
        },
      });

      await checkChatPermissions(chat, userId);
    } catch (err) {
      TE(err);
    }

    return chat;
  }

  async createChat(
    name, img, anonymous = true, participants,
  ) {
    let chat;
    const { Chat } = this.models;
    const userId = checkAuth(this.ctx);

    try {
      chat = await Chat.create({ name, img, anonymous });

      await chat.setOwner(userId);

      const p = [...new Set([...participants.map((a) => +a), userId])];
      await chat.setParticipants(p);
    } catch (err) {
      TE(err);
    }

    return chat;
  }

  async deleteChat(chatId) {
    let success;
    const { Chat } = this.models;
    const ownerId = checkAuth(this.ctx);

    try {
      success = await Chat.destroy({
        where: {
          ownerId,
          id: chatId,
        },
      });

      if (!success) {
        TE(NOT_FOUND);
      }
    } catch (err) {
      TE(err);
    }

    return !!success;
  }

  async updateChat(
    chatId,
    name,
    img,
    anonymous,
    participants,
  ) {
    let chat;
    const { Chat } = this.models;
    const ownerId = checkAuth(this.ctx);

    try {
      [chat] = await Chat.findAll({
        where: {
          ownerId,
          id: chatId,
        },
      });

      if (!chat) {
        TE(NOT_FOUND);
      }

      await chat.update({
        img,
        name,
        anonymous,
      });

      if (participants !== undefined) {
        const p = [...new Set([...participants.map((a) => +a), ownerId])];
        await chat.setParticipants(p);
      }
    } catch (err) {
      TE(err);
    }

    return chat;
  }

  async createMessage(
    text,
    chatId,
    attachment,
    attachmentType,
  ) {
    let message;
    const userId = checkAuth(this.ctx);
    const { Chat, Message } = this.models;

    try {
      const [chat] = await Chat.findAll({
        where: {
          id: chatId,
        },
      });

      await checkChatPermissions(chat, userId);

      message = await Message.create({
        text,
        attachment,
        attachmentType,
      });

      await message.setOwner(userId);
      await chat.addMessages([message]);
    } catch (err) {
      TE(err);
    }

    return message;
  }

  async updateMessage(
    msgId,
    text,
    attachment,
    attachmentType,
  ) {
    let message;
    const { Chat, Message } = this.models;
    const userId = checkAuth(this.ctx);

    try {
      [message] = await Message.findAll({
        where: {
          id: msgId,
        },
      });

      if (!message) {
        TE(NOT_FOUND);
      }

      await message.update(
        text,
        attachment,
        attachmentType,
      );
    } catch (err) {
      TE(err);
    }

    return message;
  }
}

export default ChatAPI;
