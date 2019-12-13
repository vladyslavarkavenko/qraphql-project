import { paginate } from '../../utils';

const messagesConnection = async (chat, {
  last, first, after, before,
}) => paginate(chat, {
  method: 'getMessages', last, first, after, before,
});

const participantsConnection = async (chat, {
  last, first, after, before,
}) => paginate(chat, {
  method: 'getParticipants', last, first, after, before,
});


export default {
  messagesConnection,
  participantsConnection,
};
