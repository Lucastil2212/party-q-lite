import dotenv from "dotenv";

dotenv.config();

export const development = {
  client: "pg",
  connection: process.env.DB_URL,
  migrations: {
    directory: "./db/migrations",
  },
  seeds: { directory: "./db/seeds" },
  ssl: true,
};
export const testing = {
  client: "pg",
  connection: process.env.DB_URL,
  migrations: {
    directory: "./db/migrations",
  },
  seeds: { directory: "./db/seeds" },
};
export const production = {
  client: "pg",
  connection: process.env.DB_URL,
  migrations: {
    directory: "./db/migrations",
  },
  seeds: { directory: "./db/seeds" },
};
