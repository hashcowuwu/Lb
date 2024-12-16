import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite", { create: true });
const createTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
createTable.run();

export default db;
