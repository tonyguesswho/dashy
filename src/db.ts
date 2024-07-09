import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { User } from './models/user';
import { Session } from './models/session';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  logging: false, // set to console.log to see the raw SQL queries
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {},
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Initialize models
    User.initialize(sequelize);
    Session.initialize(sequelize);

    // Set up associations
    User.hasMany(Session, { foreignKey: 'userId' });
    Session.associate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process with failure
  }
};

export { sequelize };
