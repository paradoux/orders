import { OrderItem } from "../models/models"

export const insertOrderItem = async (args: {
  orderId: string
  itemId: string
  qty: number
  notes: string
}): Promise<OrderItem> => {
  const newOrderItem = await OrderItem.create({
    order_id: args.orderId,
    item_id: args.itemId,
    qty: args.qty,
    notes: args.notes,
  })

  return <OrderItem>newOrderItem
}

export const findAndUpdateOrderItem = async (args: {
  orderItemId: string
  qty: number
  notes: string
}): Promise<OrderItem> => {
  const orderItem = await OrderItem.findByPk(args.orderItemId)

  if (!orderItem) {
    const message = "Failed to find order_item to update"
    console.log(message, {
      orderItemId: args.orderItemId,
    })
    throw new Error(message)
  }

  orderItem.set({
    qty: args.qty,
    notes: args.notes,
  })

  await orderItem.save()

  return <OrderItem>orderItem
}
