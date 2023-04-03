const app = require("express");
const exeptionMiddleware = require("./execption");

const middlewareList = [exeptionMiddleware];

module.exports = (app) => {
  middlewareList.forEach((middleware) => app.use(middleware));
};
