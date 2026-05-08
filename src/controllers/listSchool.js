import pool from "../config/db.js"
import { haversine } from "../utils/haversine.js"

export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (latitude == undefined || longitude == undefined) {
      return res.status(400).json({
        error: "Latitude and Longitude are required"
      })
    }

    const userLat = parseFloat(latitude)
    const userLon = parseFloat(longitude)

    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({
        error: "Latitude and Longitude must be numbers"
      })
    }

    if (userLat < -90 || userLat > 90 || userLon < -180 || userLon > 180) {
      return res.status(400).json({
        error: "Invalid coordinates"
      })
    }

    const [schools] = await pool.execute(`SELECT id, name, address, latitude, longitude FROM schools`);

    const sorted = schools.map((school) => ({
      ...school,
      distance: haversine(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      data: sorted
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: "Internal Server Error"
    })
  }
}