import pool from "../config/db.js";

export const addSchool = async (req, res) => {
  try {
    
    
    const { name, address, latitude, longitude } = req.body;
    
    if (!name || !address || latitude == undefined || longitude == undefined) {
      return res.status(400).json({
        error: "All field are required"
      })
    }
    
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ 
        error: "Latitude and Longitude must be numbers" 
      })
    }
    
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({
        error: "Invalid Coordinates"
      })
    }
    
    const safeName = name.trim();
    const safeAddress = address.trim();
    
    const [result] = await pool.execute(
      `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
      [safeName, safeAddress, latitude, longitude]
    )
    
    res.status(201).json({
      message: "School added successfully",
      school: {
        id: result.insertId, 
        name: safeName,
        address: safeAddress,
        latitude,
        longitude,
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: "Internal Server Error"
    })
  } 
}