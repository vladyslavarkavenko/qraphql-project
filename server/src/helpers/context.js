import jwt from './jwt';

const context = ({ req }) => {
  const Authorization = req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token);

    return { isAuthorized: true, userId };
  }

  return { isAuthorized: false };
};

export default context;
