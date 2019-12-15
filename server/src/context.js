import { getAuthData } from './utils';

const context = (integrationContext) => {
  try {
    const { userId } = getAuthData(integrationContext);

    return { isAuthorized: true, userId };
  } catch (err) {
    console.log('ERROR:', err);
    return { isAuthorized: false };
  }
};

export default context;
