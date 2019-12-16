import jwt from './jwt';

const authHeader = 'Authorization';

const getAuthData = ({ req, connection }) => {
  const header = connection ? connection.context[authHeader] : req.get(authHeader);
  const accessToken = header ? header.replace('Bearer ', '') : '';

  return jwt.verify(accessToken);
};

export default getAuthData;
