import * as chatQueries from './chatQueries';
import * as userQueries from './userQueries';

export default {
  ...userQueries,
  ...chatQueries,
};
