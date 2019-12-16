import { config } from 'dotenv';

config();

export const {
  PORT = '4000',

  DB_NAME = 'database',
  DB_USERNAME = 'username',
  DB_PASSWORD = 'password',

  TOKEN_SECRET = 'secret',
  ACCESS_TOKEN_EXPIRES_IN = 24 * 60 * 60 * 1000, // One day
  REFRESH_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60 * 1000, // One month
} = process.env;
