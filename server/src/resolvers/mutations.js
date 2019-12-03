import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import CONFIG from '../config';

const { JWT_SECRET } = CONFIG;

async function signup(_, { email, password, name }, { dataSources: { userAPI } }) {
  const user = await userAPI.createUser({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  // TODO: Add jwt expiration time.
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  return { token, user };
}

export async function login(_, { email, password }, { dataSources: { userAPI } }) {
  const user = await userAPI.getUser({ email });
  if (!user) {
    throw new Error('No user found');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  return { token, user };
}

export default { login, signup };
