import * as express from "express"
import { getOrderById } from "./controllers/orders"

import { createOrderItem, updateOrderItem } from "./controllers/orders_items"

const router = express.Router()

router.get("/order/:id", getOrderById)
router.post("/order-item", createOrderItem)
router.put("/order-item/:id", updateOrderItem)

export default router
