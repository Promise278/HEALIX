const { Sequelize } = require('sequelize');
require('dotenv').config();

const url = process.env.DB_URL;
console.log('Testing connection to:', url ? 'URL provided' : 'No URL found');

const sequelize = new Sequelize(url, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

test();
