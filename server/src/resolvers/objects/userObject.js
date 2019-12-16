import { paginate } from '../../utils';

const chatsConnection = async (user, {
  before, after, first, last,
}) => paginate(user, {
  method: 'getChats', before, after, first, last,
});

const friendsConnection = async (user, {
  before, after, first, last,
}) => paginate(user, {
  method: 'getFriends', before, after, first, last,
});

export default { chatsConnection, friendsConnection };
