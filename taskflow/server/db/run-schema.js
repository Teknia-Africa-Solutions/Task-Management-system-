// Creates the database (if missing) and runs schema.sql.
// Usage: npm run db:schema
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import { config } from "../src/config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");

  // Connect WITHOUT selecting a database so we can create it first.
  const conn = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    multipleStatements: true,
  });

  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${config.db.database}\`
       CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  );
  await conn.query(`USE \`${config.db.database}\`;`);
  await conn.query(sql);

  console.log(`✔ Schema applied to database "${config.db.database}".`);
  await conn.end();
}

main().catch((err) => {
  console.error("✖ Schema failed:", err.message);
  process.exit(1);
});
