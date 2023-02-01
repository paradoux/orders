import { Request, Response } from "express"
import { findAndUpdateOrderItem, insertOrderItem } from "../data/orders_items"

export const createOrderItem = async (req: Request, res: Response) => {
  const { orderId, itemId, qty, notes } = req.body

  if (!orderId || !itemId || !qty || !notes) {
    const message = "Missing parameter"
    console.log(message, {
      orderId,
      itemId,
      qty,
      notes,
    })
    return res.status(422).send(message)
  }

  let newOrderItem
  try {
    newOrderItem = await insertOrderItem({
      orderId,
      itemId,
      qty,
      notes,
    })
  } catch (err) {
    const message = "Failed to create order_item"
    console.log(`${message}: ${err.message}`, {
      orderId,
      itemId,
      qty,
      notes,
    })
    return res.status(500).send(message)
  }

  return res.status(201).send({ orderItem: newOrderItem })
}

export const updateOrderItem = async (req: Request, res: Response) => {
  const { id } = req.params
  const { qty, notes } = req.body

  if (!id) {
    const message = "Missing parameter"
    console.log(message, {
      id,
      qty,
      notes,
    })
    return res.status(422).send(message)
  }

  if (Object.keys(req.body).length === 0) {
    const message = "Missing payload"
    console.log(message, {
      qty,
      notes,
    })
    return res.status(422).send(message)
  }

  let orderItem
  try {
    orderItem = await findAndUpdateOrderItem({
      orderItemId: id,
      qty,
      notes,
    })
  } catch (err) {
    const message = "Failed to update order_item"
    console.log(`${message}: ${err.message}`, {
      orderId: id,
      qty,
      notes,
    })
    return res.status(500).send(message)
  }
  return res.status(200).send({ orderItem: orderItem })
}
