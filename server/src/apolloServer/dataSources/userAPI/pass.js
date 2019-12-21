import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export default {
  hash: (password) => hashSync(password, genSaltSync()),
  compare: compareSync,
};
