import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  public id!: number;

  public email!: string;

  public password!: string | null;

  public name!: string | null;

  public emailVerified!: boolean;

  public verificationToken!: string | null;

  public authProvider!: string;

  public authProviderId!: string | null;

  static initialize(sequelize: Sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      authProvider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authProviderId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'User',
    });
  }
}
