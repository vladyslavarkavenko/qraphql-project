import dotenv from 'dotenv';

dotenv.config();

const {
  PORT = '4000',
  NODE_ENV = 'development',
  JWT_SECRET = 'secret',
  DB_NAME = 'database',
  DB_USERNAME = 'username',
  DB_PASSWORD = 'password',
} = process.env;

export default {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
};
