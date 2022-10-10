import { env } from 'process';

export default () => ({
  environment: env.NODE_ENV || 'development',
  database: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10) || 5432,
  },
});
