import * as chatQueries from './chatQueries';
import * as userQueries from './userQueries';
import * as messageQueries from './messageQueries';

export default {
  ...userQueries,
  ...chatQueries,
  ...messageQueries,
};
