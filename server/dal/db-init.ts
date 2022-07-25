import { pool } from "./db-pool";

export const initializeTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS imgheaven_users(
        id INTEGER PRIMARY KEY,
        login TEXT UNIQUE NOT NULL,
        github_token TEXT UNIQUE NOT NULL,
        avatar_url TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS imgheaven_tokens(
        user_id INTEGER UNIQUE NOT NULL,
        github_token TEXT UNIQUE NOT NULL,
        refresh_token TEXT UNIQUE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES imgheaven_users(id)
      );
      CREATE TABLE IF NOT EXISTS imgheaven_images(
        id SERIAL PRIMARY KEY,
        creator TEXT NOT NULL,
        url TEXT NOT NULL,
        likes TEXT[] NOT NULL,
        FOREIGN KEY (creator) REFERENCES imgheaven_users(login)
      )
    `);
    console.log("tables created");
  } catch (e) {
    throw e;
  }
};
