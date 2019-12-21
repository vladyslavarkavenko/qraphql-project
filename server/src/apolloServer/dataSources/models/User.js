import { DataTypes, Model } from 'sequelize';

import { USER_SEX } from '../../../const';
import sequelize from '../../globals/store';

const { FEMALE, MALE } = USER_SEX;

const {
  STRING, BOOLEAN, DATE, ENUM, VIRTUAL, INTEGER,
} = DataTypes;

const modelName = 'user';

const birthday = 'birthday';

class User extends Model {}
User.init({
  name: {
    type: STRING,
    allowNull: false,
  },
  avatar: {
    type: STRING,
    validate: {
      isUrl: true,
    },
  },
  [birthday]: {
    type: DATE,
    allowNull: false,
  },
  sex: {
    type: ENUM,
    allowNull: false,
    values: [FEMALE, MALE],
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  online: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  lastSeen: {
    type: DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  refreshToken: {
    type: STRING,
  },
  age: {
    type: VIRTUAL(INTEGER, [birthday]),
    get() {
      // Has precision issues
      const ageDifMs = Date.now() - new Date(this.get(birthday)).getTime();
      const ageDate = new Date(ageDifMs);

      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
  },
}, {
  sequelize,
  modelName,
  indexes: [{
    unique: true,
    fields: ['email'],
  }],
});

export default User;
