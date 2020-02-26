import * as envVars from '../../config/env';
console.log("Munna");
console.log(envVars);
module.exports = {
  development: {
    username: envVars.postgres.username || 'postgres',
    password:envVars.postgres.password || '123456',
    database:envVars.postgres.database || 'every_urban',
    host: envVars.postgres.server || '192.168.1.101',
    dialect: 'postgres'
  },
  test: {
    username: envVars.postgres.username || 'postgres',
    password:envVars.postgres.password || '123456',
    database:envVars.postgres.database || 'every_urban',
    host: envVars.postgres.server || '192.168.1.101',
    dialect: 'postgres'
  },
  production: {
    username: envVars.postgres.username || 'postgres',
    password:envVars.postgres.password || 'everyurban2020',
    database:envVars.postgres.database || 'every_urban',
    host: envVars.postgres.server || '172.17.0.1',
    dialect: 'postgres'
  },
  staging: {
    username: envVars.postgres.username || 'postgres',
    password:envVars.postgres.password || '123456',
    database:envVars.postgres.database || 'every_urban',
    host: envVars.postgres.server || '192.168.1.101',
    dialect: 'postgres'
  }
};
