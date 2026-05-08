import pool from "../config/db.js";

const schools = [
  { name: "Delhi Public School", address: "Mathura Road, New Delhi", latitude: 28.6139, longitude: 77.2090 },
  { name: "Ryan International School", address: "Sector 40, Gurgaon", latitude: 28.4595, longitude: 77.0266 },
  { name: "Kendriya Vidyalaya", address: "IIT Campus, Mumbai", latitude: 19.0760, longitude: 72.8777 },
  { name: "DAV Public School", address: "Banjara Hills, Hyderabad", latitude: 17.4126, longitude: 78.4487 },
  { name: "St. Xavier's School", address: "Park Street, Kolkata", latitude: 22.5744, longitude: 88.3629 },
];

const seed = async () => {
  const conn = await pool.getConnection();
  try {
    for (const s of schools) {
      await conn.execute(
        `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
        [s.name, s.address, s.latitude, s.longitude]
      );
    }
    console.log("Seeded successfully");
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    conn.release();
    process.exit(0);
  }
};

seed();