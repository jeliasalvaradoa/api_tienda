const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model.js');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema =  {
  id: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true

  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.UUID,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Customer extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user'}); //para la asociación de llaves foraneas
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    });
  }                                // este alias se usa en el customer.service. para anidar la consulta

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports  = { Customer, CUSTOMER_TABLE, CustomerSchema }
