const request = require("supertest")

import { app } from "../../index"
import * as ordersItemsData from "../../data/orders_items"
import { OrderItem } from "../../models/models"

afterEach(() => {
  jest.restoreAllMocks()
})

describe("OrderItem", () => {
  describe("when calling POST /api/order-item with valid params", () => {
    it("should successfully return an order", async () => {
      const mockNewOrderItem = {
        id: 3,
        order_id: "fbe2b58f-75f0-44ae-a3b0-fe681da5f14d",
        item_id: "1816df9d-bcf0-41a7-8766-876503cfc1a4",
        qty: 12,
        notes: "This is a test",
      } as unknown as OrderItem

      jest
        .spyOn(ordersItemsData, "insertOrderItem")
        .mockResolvedValue(mockNewOrderItem)

      const res = await request(app).post(`/api/order-item`).send({
        orderId: mockNewOrderItem.order_id,
        itemId: mockNewOrderItem.item_id,
        qty: mockNewOrderItem.qty,
        notes: mockNewOrderItem.notes,
      })

      expect(res.statusCode).toEqual(201)
      expect(res.body).toMatchObject({ orderItem: mockNewOrderItem })
    })
  })

  describe("when calling POST /api/order-item with missing params", () => {
    it("should successfully return an order", async () => {
      const mockNewOrderItem = {
        id: 3,
        order_id: "fbe2b58f-75f0-44ae-a3b0-fe681da5f14d",
        item_id: "1816df9d-bcf0-41a7-8766-876503cfc1a4",
        qty: 12,
        notes: "This is a test",
      } as unknown as OrderItem

      const res = await request(app).post(`/api/order-item`).send({
        orderId: mockNewOrderItem.order_id,
        itemId: mockNewOrderItem.item_id,
        qty: mockNewOrderItem.qty,
      })

      expect(res.statusCode).toEqual(422)
    })
  })

  describe("when calling PUT /api/order-item/:id with valid params", () => {
    it("should successfully return an order", async () => {
      const updatedNewOrderItem = {
        id: 3,
        order_id: "fbe2b58f-75f0-44ae-a3b0-fe681da5f14d",
        item_id: "1816df9d-bcf0-41a7-8766-876503cfc1a4",
        qty: 12,
        notes: "This is a test",
      } as unknown as OrderItem

      jest
        .spyOn(ordersItemsData, "findAndUpdateOrderItem")
        .mockResolvedValue(updatedNewOrderItem)

      const res = await request(app).put(`/api/order-item/3`).send({
        qty: updatedNewOrderItem.qty,
        notes: updatedNewOrderItem.notes,
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toMatchObject({ orderItem: updatedNewOrderItem })
    })
  })

  describe("when calling PUT /api/order-item/:id with unknown orderitem", () => {
    it("should successfully return an order", async () => {
      const updatedNewOrderItem = {
        id: 3,
        order_id: "fbe2b58f-75f0-44ae-a3b0-fe681da5f14d",
        item_id: "1816df9d-bcf0-41a7-8766-876503cfc1a4",
        qty: 12,
        notes: "This is a test",
      } as unknown as OrderItem

      jest
        .spyOn(ordersItemsData, "findAndUpdateOrderItem")
        .mockRejectedValueOnce(new Error("Failed to find order_item to update"))

      const res = await request(app).put(`/api/order-item/12`).send({
        qty: updatedNewOrderItem.qty,
        notes: updatedNewOrderItem.notes,
      })

      expect(res.statusCode).toEqual(500)
    })
  })

  describe("when calling PUT /api/order-item/:id with missing payload", () => {
    it("should successfully return an order", async () => {
      const res = await request(app).put(`/api/order-item/12`).send(null)
      expect(res.statusCode).toEqual(422)
    })
  })
})
