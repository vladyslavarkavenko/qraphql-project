import { jwt } from './utils';

const authHeader = 'Authorization';

const context = ({ req, connection }) => {
  let userId;
  const header = connection ? connection.context[authHeader] : req.get(authHeader);

  try {
    const token = header ? header.replace('Bearer ', '') : '';

    ({ userId } = jwt.verify(token));
  } catch (err) {
    console.log('ERROR:', err);
    return { isAuthorized: false };
  }

  return { isAuthorized: true, userId };
};

export default context;
