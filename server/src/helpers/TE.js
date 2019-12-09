import {
  ValidationError,
  UniqueConstraintError,
  ExclusionConstraintError,
  ForeignKeyConstraintError,
} from 'sequelize';

import { ERROR } from '../const';

const {
  SERVER_ERROR,
  INVALID_DATA,
  DUPLICATE_DATA,
  INVALID_FOREIGN_KEY,
} = ERROR;

const TE = (err, { log } = { log: true }) => {
  if (log) {
    console.trace('ERROR:', err);
  }

  if (typeof err === 'string') {
    throw new Error(err);
  } if (Object.values(ERROR).indexOf(err.message) !== -1) {
    throw err;
  } else {
    switch (err.constructor) {
      case ValidationError:
      case ExclusionConstraintError:
        throw new Error(INVALID_DATA);
      case UniqueConstraintError:
        throw new Error(DUPLICATE_DATA);
      case ForeignKeyConstraintError:
        throw new Error(INVALID_FOREIGN_KEY);
      default:
        throw new Error(SERVER_ERROR);
    }
  }
};

export default TE;
