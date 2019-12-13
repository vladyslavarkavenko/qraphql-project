import { Sequelize } from 'sequelize';

import { DB_NAME, DB_USERNAME, DB_PASSWORD } from './config';

const sequelize = new Sequelize(
  {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    logging: false,
    dialect: 'sqlite',
    storage: './store.sqlite',
  },
);

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to DB has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the DB:', err);
  });

export default sequelize;
