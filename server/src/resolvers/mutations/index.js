import * as userMutations from './userMutations';
import * as chatMutations from './chatMutations';
import * as messageMutations from './messageMutations';

export default {
  ...userMutations,
  ...chatMutations,
  ...messageMutations,
};
