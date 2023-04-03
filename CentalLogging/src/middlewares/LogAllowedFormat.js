const { isFormatAllowed } = require("../Validations/LogValidations");
const { Client, ClientLogLimitRules } = require("../db/models");
async function getClientById(clientId) {
  try {
    const client = await Client.findOne({ where: { id: clientId } });
    return client;
  } catch (error) {
    throw error;
  }
}

module.exports = async (req, res, next) => {
  console.log("invoked Format Middleware");
  const { clientId, format } = req.body;
  const client = await getClientById(clientId);
  if (!(await isFormatAllowed(format, client))) {
    return res.status(400).json("Not Allowed Format");
  }
  next();
};
