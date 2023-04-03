const { ClientAllowedFormats } = require("../db/models");
const validate = require("./index");
const createLogSchema = require("../DTO/logSchema");
const isFormatAllowed = async (logFormat, client) => {
  console.log(logFormat, client);
  const allowedFormat = await ClientAllowedFormats.findOne({
    where: {
      clientId: client.id,
      isActive: true,
      format: logFormat,
    },
  });

  return allowedFormat ? true : false;
};

const validateLogInput = (input) => {
  return validate(createLogSchema, input);
};

module.exports = Object.freeze({
  isFormatAllowed,
  validateLogInput,
});
