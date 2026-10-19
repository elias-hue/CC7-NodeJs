const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:8000'
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

module.exports = swaggerAutogen(outputFile, routes, doc);