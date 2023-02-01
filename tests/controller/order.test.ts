const request = require("supertest")

import { app } from "../../index"
import * as ordersData from "../../data/orders"
import { Order } from "../../models/models"
import { OrderItem } from "sequelize"

afterEach(() => {
  jest.restoreAllMocks()
})

describe("Order", () => {
  describe("when calling GET /api/order/:id with existing order id", () => {
    it("should successfully return an order", async () => {
      const mockOrderId = "fbe2b58f-75f0-44ae-a3b0-fe681da5f14d"
      const mockOrderItems = [
        {
          id: 3,
          order_id: "fbe2b58f-75f0-44ae-a3b0-fe681da5f14d",
          item_id: "1816df9d-bcf0-41a7-8766-876503cfc1a4",
          qty: 12,
          notes: "This is a test",
        },
      ] as unknown as OrderItem[]

      const mockOrder = {
        id: mockOrderId,
        customer_id: "ca48570d-6265-453a-b9da-ca9bc982bfee",
        status: "OPEN",
        date: "2020-12-04",
        orders_items: mockOrderItems,
      } as unknown as Order

      jest.spyOn(ordersData, "readOrderById").mockResolvedValue(mockOrder)

      const res = await request(app).get(`/api/order/${mockOrderId}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toMatchObject({ order: mockOrder })
    })
  })

  describe("when calling GET /api/order/:id with unknown order id", () => {
    it("should successfully return an order", async () => {
      jest
        .spyOn(ordersData, "readOrderById")
        .mockResolvedValue(null as unknown as Order)

      const res = await request(app).get("/api/order/unknownid")

      expect(res.statusCode).toEqual(404)
    })
  })
})
