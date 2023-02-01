var path = require("path")
import { Sequelize } from "sequelize"
import SQLite from "sqlite3"

export const dbConnection = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "db", "orders.db"),
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE,
  },
})
