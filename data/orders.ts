import { Order, OrderItem } from "../models/models"

export const readOrderById = async (id: string): Promise<Order | null> => {
  const order = await Order.findByPk(id, {
    include: OrderItem,
  })
  return <Order>order
}
