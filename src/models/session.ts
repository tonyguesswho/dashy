import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './user';

export class Session extends Model {
  public id!: number;

  public userId!: number;

  public token!: string;

  public lastActive!: Date;

  public expiresAt!: Date;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Session.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      lastActive: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Session',
      tableName: 'Sessions',
    });
  }

  static associate() {
    Session.belongsTo(User, { foreignKey: 'userId' });
  }
}
