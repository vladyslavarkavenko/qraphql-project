import Sequelize, { Op } from 'sequelize';

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const store = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases: {
      $in: Op.in,
    },
    logging: false,
  },
);

// Test connection
store
  .authenticate()
  .then(() => {
    console.log('Connection to DB has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the DB:', err);
  });

export default store;
