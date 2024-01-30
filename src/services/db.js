import { Sequelize } from 'sequelize';

const {
  POSTGRES_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
} = process.env;

export const sequelize = new Sequelize(
  POSTGRES_DATABASE || 'verceldb',
  POSTGRES_USER || 'default',
  POSTGRES_PASSWORD || 'CYFZn7t9AWmI',
  {
    host: POSTGRES_HOST || 'ep-noisy-river-a2edgone-pooler.eu-central-1.postgres.vercel-storage.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);
