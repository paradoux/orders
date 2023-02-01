import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  ForeignKey,
} from "sequelize"
import { dbConnection } from "../db/connection"

export class Customer extends Model<
  InferAttributes<Customer>,
  InferCreationAttributes<Customer>
> {
  declare id: string
  declare email: string
  declare given_name: string
  declare family_name: string
}
export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: string
  declare customer_id: ForeignKey<Customer["id"]>
  declare status: string
  declare date: string
}
export class Item extends Model<
  InferAttributes<Item>,
  InferCreationAttributes<Item>
> {
  declare id: string
  declare name: string
  declare cost: string
}
export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare id: CreationOptional<number>
  declare order_id: ForeignKey<Order["id"]>
  declare item_id: ForeignKey<Item["id"]>
  declare qty: number
  declare notes: string
}

Customer.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    given_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    family_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: dbConnection,
    modelName: "customer",
    timestamps: false,
    underscored: true,
  }
)

Order.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: dbConnection,
    modelName: "order",
    timestamps: false,
    underscored: true,
  }
)

Item.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: dbConnection,
    modelName: "item",
    timestamps: false,
    underscored: true,
  }
)

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: dbConnection,
    modelName: "orders_items",
    timestamps: false,
    underscored: true,
  }
)

Customer.hasMany(Order, { foreignKey: "customer_id" })
Order.hasMany(OrderItem, { foreignKey: "order_id" })
Item.hasMany(OrderItem, { foreignKey: "item_id" })
