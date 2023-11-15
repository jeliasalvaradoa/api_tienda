import { Model, DataTypes, Sequelize } from 'sequelize';

export const USER_TABLE = 'users';
 export const UserSchema = {


  id: {
    allowNull: false,
    type: DataTypes.UUID,//INTEGER,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
}

class User extends Model {
 static associate(models) {
  this.hasOne(models.Customer, {
    as: 'customer',
    foreignKey: 'userId'
  });

 }

 static config(sequelize) {
  return {
    sequelize,
    tableName: USER_TABLE,
    modelName: 'User',
    timestamps: false
  }
 }

}

export default User
//module.exports  = { User, UserSchema, USER_TABLE }
