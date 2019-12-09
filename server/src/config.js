import { config } from 'dotenv';

config();

const { env } = process;

export const PORT = env.PORT || '4000';
export const DB_NAME = env.DB_NAME || 'database';
export const JWT_SECRET = env.JWT_SECRET || 'secret';
export const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN || 24 * 60 * 60 * 1000;
// export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_USERNAME = env.DB_USERNAME || 'username';
export const DB_PASSWORD = env.DB_PASSWORD || 'password';
