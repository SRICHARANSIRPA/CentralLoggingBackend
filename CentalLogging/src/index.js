//https://github.com/eliyabar/NodeJS-RestAPI
const express = require("express");
const app = express();
const cors = require("cors");
const Configureroutes = require("./routes");
// const routes = require("./routes");
const ConfigureMiddleware = require("./middlewares");

var PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

//Middleware Configuration
ConfigureMiddleware(app);

//Routes Configuration
Configureroutes(app);

// Handling default Route
app.use("/", function (req, res, next) {
  res.status(404).send("Sorry, the page you requested cannot be found.");
});

// Error handling Route
app.use((error, req, res, next) => {
  console.error(`error.......#######...${error}`);
  res.status(500).json({ message: "Something went wrong. in API" });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
