/* eslint-disable no-undef */
import { config } from 'dotenv';
import url from 'url';
import path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

config({ path: path.normalize(`${__dirname}/../dynamics/.env`) });

const defaultConfig = {
  PORT: 8080,
  ENVIRONMENT: 'development',
  DISCORD_TOKEN: '',
  DISCORD_APPLICATION_ID: '',
  DISCORD_SERVER_ID: '',
  DB_HOST: '127.0.0.1',
  DB_PORT: 5432,
  DB_USERNAME: 'root',
  DB_PASSWORD: 'root',
  DB_POOL_CONNECTION_LIMIT: 5,
  DB_IDLE_TIMEOUT_MILLIS: 10000,
  DB_CONNECTION_TIMEOUT_MILLIS: 2000
};

const args = process.argv.slice(2);
const argsConfig = args.reduce((final, arg) => {
  const [key, value] = arg.split('=');
  return Object.assign(final, { [key]: value });
}, {});

const mergedConfig = {
  ...defaultConfig,
  ...process.env,
  ...argsConfig,
};

export default mergedConfig;