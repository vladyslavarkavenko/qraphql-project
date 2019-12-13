import UserAPI from './UserAPI';
import ChatAPI from './ChatAPI';
import MessageAPI from './MessageAPI';

import models from '../models';
import store from '../store';

store.sync();

export default () => ({
  UserAPI: new UserAPI({ models }),
  ChatAPI: new ChatAPI({ models }),
  MessageAPI: new MessageAPI({ models }),
});
