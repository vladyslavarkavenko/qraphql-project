import {
  ValidationError,
  UniqueConstraintError,
  ExclusionConstraintError,
  ForeignKeyConstraintError,
} from 'sequelize';
import { JsonWebTokenError } from 'jsonwebtoken';

import { ERROR } from '../const';

const {
  SERVER_ERROR,
  INVALID_DATA,
  DUPLICATE_DATA,
  UNAUTHENTICATED,
  INVALID_FOREIGN_KEY,
} = ERROR;

const formatErr = (err) => {
  switch (err.constructor) {
    case ValidationError:
    case ExclusionConstraintError:
      throw new Error(INVALID_DATA);
    case UniqueConstraintError:
      throw new Error(DUPLICATE_DATA);
    case ForeignKeyConstraintError:
      throw new Error(INVALID_FOREIGN_KEY);
    case JsonWebTokenError:
      throw new Error(UNAUTHENTICATED);
    default:
      throw new Error(SERVER_ERROR);
  }
};

const checkIfCustomErr = (err) => {
  if (typeof err === 'string') {
    throw new Error(err);
  } else if (Object.values(ERROR).indexOf(err.message) > -1) {
    throw err;
  }

  return false;
};

const TE = (err, { log } = { log: true }) => {
  if (log) {
    console.trace('ERROR:', err);
  }

  if (!checkIfCustomErr(err)) {
    formatErr(err);
  }
};

export default TE;
