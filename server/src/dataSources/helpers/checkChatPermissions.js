import { TE } from '../../utils';
import { ERROR } from '../../const';
import checkAuth from './checkAuth';

const { PERMISSION_DENIED, NOT_FOUND } = ERROR;

async function checkChatPermissions(chatId, isOwner = false) {
  let chat;
  const { Chat } = this.models;
  const userId = checkAuth(this.ctx);

  if (isOwner) {
    try {
      [chat] = await Chat.findAll({
        where: {
          ownerId: userId,
          id: chatId,
        },
      });
    } catch (err) {
      TE(err);
    }

    if (!chat) {
      TE(NOT_FOUND);
    }
  } else {
    try {
      [chat] = await Chat.findAll({
        where: {
          id: chatId,
        },
      });
    } catch (err) {
      TE(err);
    }

    if (!chat) {
      TE(NOT_FOUND);
    }

    const participants = await chat.getParticipants();
    if (participants.findIndex(({ id }) => id === userId) === -1) {
      TE(PERMISSION_DENIED);
    }
  }

  return chat;
}

export default checkChatPermissions;
