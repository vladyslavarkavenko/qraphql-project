import * as userSubscriptions from './userSubscriptions';
import * as chatSubscriptions from './chatSubscriptions';
import * as messageSubscriptions from './messageSubscriptions';

export default {
  ...userSubscriptions,
  ...chatSubscriptions,
  ...messageSubscriptions,
};
