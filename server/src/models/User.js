import { DataTypes, Model } from 'sequelize';

import sequelize from '../store';

const { STRING, BOOLEAN, DATE } = DataTypes;

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
}, {
  sequelize,
  modelName,
  indexes: [{
    unique: true,
    fields: ['email'],
  }],
});

export default User;
