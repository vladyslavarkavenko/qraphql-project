import jwt from 'jsonwebtoken';

import TE from '../../../utils/TE';
import {
  TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '../../../config';

const verifyCallback = (err, payload) => {
  if (err) TE(err);

  return payload;
};

export default {
  create: async (user) => {
    const { id, email, name } = user;

    const accessToken = jwt.sign(
      { name, email, userId: id },
      TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      { name, email, userId: id },
      TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
    );

    try {
      await user.update({ refreshToken });
    } catch (err) {
      TE(err);
    }

    return { accessToken, refreshToken };
  },
  verify: (token) => jwt.verify(token, TOKEN_SECRET, verifyCallback),
};
