import { Model, DataTypes, Sequelize } from 'sequelize';
import { CUSTOMER_TABLE } from './customer.model.js';

export const ORDER_TABLE = 'orders';

export const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  total: { //Este campo es vitual sequelize no lo agrega  a la base de datos
    type: DataTypes.VIRTUAL,
    get() {
      try{
          if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
    }catch(err){}
    return 0;
    }
  }
}

class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

export default Order

