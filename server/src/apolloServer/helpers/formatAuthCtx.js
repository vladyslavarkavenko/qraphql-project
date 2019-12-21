import { AUTH_HEADER } from '../../const';
import { jwt } from '../dataSources/userAPI';

function formatAuthCtx({ req, connectionParams }) {
  const header = req ? req.get(AUTH_HEADER) : connectionParams[AUTH_HEADER];
  const accessToken = header && header.replace('Bearer ', '');

  if (accessToken) {
    try {
      const { userId } = jwt.verify(accessToken);

      return { isAuthorized: true, userId };
    } catch (err) {
      return { isAuthorized: false };
    }
  }

  return { isAuthorized: false };
}

export default formatAuthCtx;
