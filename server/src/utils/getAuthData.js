import jwt from './jwt';

const authHeader = 'Authorization';

const getAuthData = ({ req, connection }) => {
  const header = connection ? connection.context[authHeader] : req.get(authHeader);
  const token = header ? header.replace('Bearer ', '') : '';

  return jwt.verify(token);
};

export default getAuthData;
