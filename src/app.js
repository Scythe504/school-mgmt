import "dotenv/config"
import e from "express";
import schoolRoutes from "./routes/schools.js"

const app = e()
app.use(e.json())

app.use("/", schoolRoutes)

app.get('/', async (req, res)=> {
  res.json({
    "message": "Hello, World!"
  })
})


app.listen(process.env.PORT, ()=> {
  console.log(`Server is up on http://localhost:${process.env.PORT}`)
})