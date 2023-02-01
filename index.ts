import dotenv from "dotenv"
dotenv.config()
import express from "express"
import routes from "./routes"

const port = process.env.NODE_ENV === "test" ? 0 : 3000

export const app = express()

app.listen(port, () =>
  console.log(`Authentication example app listening on port ${port}!`)
)
app.use(express.json())

app.use("/api/", routes)
