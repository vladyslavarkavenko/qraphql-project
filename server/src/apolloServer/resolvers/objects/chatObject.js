import { paginate } from './helpers';

const messagesConnection = async (chat, {
  last, first, after, before,
}) => paginate(chat, {
  method: 'getMessages', last, first, after, before,
});

const participantsConnection = async (chat, {
  last, first, after, before,
}) => (
  chat.anonymous
    ? null
    : paginate(chat, {
      method: 'getParticipants', last, first, after, before,
    })
);


export default {
  messagesConnection,
  participantsConnection,
};
