import { DataTypes, Model } from 'sequelize';

import sequelize from '../store';

const { STRING } = DataTypes;

const modelName = 'User';

class User extends Model {}
User.init({
  name: {
    type: STRING,
    allowNull: false,
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
}, {
  sequelize,
  modelName,
  indexes: [{
    unique: true,
    fields: ['email'],
  }],
});

export default User;
