import { config } from 'dotenv';

config();

export const {
  PORT = '4000',

  DB_NAME = 'database',
  DB_USERNAME = 'username',
  DB_PASSWORD = 'password',

  JWT_SECRET = 'secret',
  JWT_EXPIRES_IN = 24 * 60 * 60 * 1000, // One day
} = process.env;
