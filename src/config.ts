import dotenv from 'dotenv-safe';

dotenv.config();

export default {
    PORT: process.env.PORT,
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS == 'null' ? undefined : process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '3306',
    JWT_SECRET: process.env.JWT_SECRET || ''
}