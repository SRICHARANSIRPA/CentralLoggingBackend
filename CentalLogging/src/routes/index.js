// const clientController = require("./client");
// const loggerController = require("./logger");
// module.exports = Object.freeze({
//   clientController,
//   loggerController,
// });
const auth = require("../middlewares/auth");
const clientController = require("./client");
const loggerController = require("./logger");

const controllerList = [
  { controller: clientController, routeURL: "/client", middlewares: [] },
  { controller: loggerController, routeURL: "/logger", middlewares: [auth] },
];

module.exports = (app) => {
  controllerList.forEach((controllerObj) =>
    app.use(
      controllerObj.routeURL,
      controllerObj.middlewares,
      controllerObj.controller
    )
  );
};
