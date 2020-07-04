module.exports = {
  dev: {
    username: 'root',
    password: '',
    database: 'bkstore',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  pro: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
  },
};
