import TE from './TE';
import { ERROR } from '../const';

const { UNAUTHENTICATED } = ERROR;

function checkAuth(context) {
  const { isAuthorized, userId } = context;

  if (!isAuthorized) {
    TE(UNAUTHENTICATED);
  }

  return userId;
}

export default checkAuth;
