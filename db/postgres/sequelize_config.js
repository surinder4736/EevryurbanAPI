module.exports = {
  //localhost db configuration
  development: {
    username: process.env.PGUSER || 'postgres',
    password: '12345',
    database: 'every-urban',
    host: 'localhost',
    dialect: 'postgres'
  },

  development: {
    username: process.env.PGUSER || 'postgres',
    password: '123456',
    //database: 'every_urban',
    database: 'every_urnan_prod',
    host: '192.168.1.101',
    dialect: 'postgres'
  },

  test: {
    username: process.env.PGUSER || 'postgres',
    password: '123456',
    database: 'every_urban',
    host: '192.168.1.101',
    dialect: 'postgres'
  },
  production: {
    username: process.env.PGUSER || 'postgres',
    password: '123456',
    database: 'every_urnan_prod',
    host: '192.168.1.101',
    dialect: 'postgres'
  }
};
