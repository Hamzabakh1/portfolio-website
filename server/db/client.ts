import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../../shared/schema.js";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

export const hasDatabase = Boolean(connectionString);

export const pool = connectionString
  ? new Pool({ connectionString })
  : undefined;

export const db = pool ? drizzle(pool, { schema }) : undefined;
