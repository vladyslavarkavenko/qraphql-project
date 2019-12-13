import jwt from 'jsonwebtoken';

import TE from './TE';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';

export default {
  create: ({ id, email, name }) => jwt.sign(
    { name, email, userId: id },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  ),
  verify: (token) => jwt.verify(
    token,
    JWT_SECRET,
    (err, payload) => { if (err) TE(err); return payload; },
  ),
};
