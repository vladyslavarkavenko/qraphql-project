import { DataTypes, Model } from 'sequelize';

import sequelize from '../store';
import { USER_SEX } from '../const';

const { FEMALE, MALE } = USER_SEX;

const {
  STRING, BOOLEAN, DATE, ENUM,
} = DataTypes;

const modelName = 'user';

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
  birthday: {
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
}, {
  sequelize,
  modelName,
  indexes: [{
    unique: true,
    fields: ['email'],
  }],
});

export default User;
