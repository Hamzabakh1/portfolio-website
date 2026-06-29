import "dotenv/config";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { db, pool } from "./client.js";

if (!db || !pool) {
  throw new Error("DATABASE_URL is required to run migrations.");
}

const migrationsDir = path.resolve(process.cwd(), "server/db/migrations");
const files = (await readdir(migrationsDir)).filter((file) => file.endsWith(".sql")).sort();

for (const file of files) {
  const sql = await readFile(path.join(migrationsDir, file), "utf8");
  await pool.query(sql);
  console.log(`Applied ${file}`);
}

await pool.end();
console.log("Database migrations applied.");
