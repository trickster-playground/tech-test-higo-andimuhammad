const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Login Analytics API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // Sesuaikan path file route
};

const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };