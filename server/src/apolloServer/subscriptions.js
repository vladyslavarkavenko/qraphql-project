import { TE } from '../utils';
import { formatAuthCtx } from './helpers';
import { initDataSources } from './dataSources';

const onConnect = async (connectionParams) => {
  const ctx = formatAuthCtx({ connectionParams });
  ctx.dataSources = initDataSources(ctx);

  const {
    isAuthorized,
    dataSources: { UserAPI },
  } = ctx;

  if (isAuthorized) {
    try {
      await UserAPI.setOnline();
    } catch (err) {
      TE(err);
    }
  }

  return ctx;
};

const onDisconnect = (params, { initPromise }) => {
  initPromise
    .then(async ({ isAuthorized, dataSources: { UserAPI } }) => {
      if (isAuthorized) {
        await UserAPI.setOnline(false);
      }
    })
    .catch(TE);
};

const subscriptions = { onConnect, onDisconnect };

export default subscriptions;
