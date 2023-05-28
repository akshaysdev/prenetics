const { Sequelize } = require('sequelize');

const postgresOptions = {
  username: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
};

const sequelize = new Sequelize({
  ...postgresOptions,
  dialect: 'postgres',
  logging: false,
});

sequelize.sync({});

sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize Database connected successfully');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = { sequelize };
