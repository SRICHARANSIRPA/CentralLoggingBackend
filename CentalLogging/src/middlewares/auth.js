const { ClientPermissions } = require("../db/models");
module.exports = async (req, res, next) => {
  const { accesskey: authKey } = req.headers;
  if (!authKey) {
    return res.status(401).send("Unauthorized");
  }
  const clientPermission = await ClientPermissions.findOne({
    where: {
      accessKey: authKey,
    },
  });
  console.log(`${authKey}...${clientPermission}`);
  if (!clientPermission) {
    return res.status(401).send("Unauthorized");
  }
  req.body.clientId = clientPermission.clientId;
  next();
};
