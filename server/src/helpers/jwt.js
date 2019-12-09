import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';

export default {
  create: (user) => jwt.sign({
    userId: user.id,
  },
  JWT_SECRET,
  {
    expiresIn: JWT_EXPIRES_IN,
  }),
  verify: (token) => jwt.verify(token, JWT_SECRET),
};
