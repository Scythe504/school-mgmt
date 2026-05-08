import pool from "./db.js";

const migrate = async () => {
  const conn = await pool.getConnection();
  try {
    await conn.execute(`CREATE DATABASE IF NOT EXISTS school_mgmt`);
    await conn.execute(`USE school_mgmt`);
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
      )
    `);
    console.log("Migration complete");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    conn.release();
    process.exit(0);
  }
};

migrate();