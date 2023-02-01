import { Request, Response } from "express"
import { readOrderById } from "../data/orders"

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    const message = "Missing parameter"
    console.log(message, {
      id,
    })
    return res.status(422).send(message)
  }

  let order
  try {
    order = await readOrderById(id)

    if (!order) {
      console.log("Could not find order", {
        orderId: id,
      })
      return res.status(404).send("Could not find order")
    }
  } catch (err) {
    console.log(`Failed to lookup order: ${err.message}`, {
      orderId: id,
    })
    return res.status(500).send("Failed to lookup order")
  }

  return res.status(200).send({ order })
}
