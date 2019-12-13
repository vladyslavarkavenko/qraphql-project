import { jwt } from './utils';

const context = ({ req }) => {
  let userId;

  try {
    const header = req.get('Authorization');
    const token = header ? header.replace('Bearer ', '') : '';

    ({ userId } = jwt.verify(token));

  } catch (err) {
    console.log('ERROR:', err);
    return { isAuthorized: false };
  }

  return { isAuthorized: true, userId };
};

export default context;
