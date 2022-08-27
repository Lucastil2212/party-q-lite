import knex from "knex";
// import knexfile from ".././knexfile";
// const env = process.env.NODE_ENV || "development";
// const congigOptions = knexfile[env];

export const db = knex({
  client: "pg",
  connection: process.env.DB_URL,
  migrations: {
    directory: "./db/migrations",
  },
  seeds: { directory: "./db/seeds" },
  ssl: true,
});
