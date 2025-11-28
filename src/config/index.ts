import dotenv from 'dotenv';
import path from 'path';
import { cleanEnv, str, num } from 'envalid';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const env = cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development' }),
  PORT: num({ default: 5000 }),
  DATABASE_URL: str(),
  JWT_SECRET: str(),
  REFRESH_TOKEN: str(),
  RESET_PASS_SECRET: str(),
  EMAIL: str(),
  APP_PASS: str(),
  JWT_RESET_PASS_TOKEN_EXPIRES_IN: str(),
  RESET_PASS_LINK: str(),
});

export default {
  node_env: env.NODE_ENV,
  port: env.PORT,
  database_url: env.DATABASE_URL,
  jwt_secret: env.JWT_SECRET,
  refresh_token: env.REFRESH_TOKEN,
  reset_pass_secret: env.RESET_PASS_SECRET,
  email: env.EMAIL,
  app_pass: env.APP_PASS,
  reset_pass_token_expires_in: env.JWT_RESET_PASS_TOKEN_EXPIRES_IN,
  reset_pass_link: env.RESET_PASS_LINK,
};
