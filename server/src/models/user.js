import { DataTypes, Model } from 'sequelize';

import sequelize from '../store';

const { STRING } = DataTypes;

class User extends Model {}
User.init({
  name: {
    type: STRING,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, { sequelize, modelName: 'User' });

export default User;
