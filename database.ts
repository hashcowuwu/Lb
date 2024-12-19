import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite", { create: true });

// 创建 users 表
const createTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);
createTable.run();

// 创建 posts 表
const createTableOfPosts = db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT, -- 允许封面图片为空
    slug TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);
createTableOfPosts.run();

export default db;
