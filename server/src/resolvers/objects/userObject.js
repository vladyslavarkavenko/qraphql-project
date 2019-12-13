import { paginate } from '../../utils';

const password = () => 'PRIVATE DATA';

const chatsConnection = async (user, {
  before, after, first, last,
}) => paginate(user, {
  method: 'getChats', before, after, first, last,
});

export default {
  password,
  chatsConnection,
};
