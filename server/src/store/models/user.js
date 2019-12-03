import { DataTypes } from 'sequelize';

import store from '../store';

const { INTEGER, STRING, DATE } = DataTypes;

const User = store.define('users', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  createdAt: DATE,
  updatedAt: DATE,
});
User.sync();

export default User;
