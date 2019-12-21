import UserAPI from './UserAPI';
import ChatAPI from './ChatAPI';
import MessageAPI from './MessageAPI';

import models from './models';
import store from '../globals/store';

store.sync();

const dataSources = () => ({
  UserAPI: new UserAPI({ models }),
  ChatAPI: new ChatAPI({ models }),
  MessageAPI: new MessageAPI({ models }),
});

export default dataSources;

export function initDataSources(context) {
  const ds = dataSources();
  Object.values(ds).forEach((API) => {
    API.initialize({ context });
  });

  return ds;
}
