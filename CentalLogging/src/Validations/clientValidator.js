const createClientSchema = require("../DTO/createClientSchema");
const validate = require("./index");

module.exports = (input) => {
  return validate(createClientSchema, input);
};
