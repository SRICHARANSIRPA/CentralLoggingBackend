const { ClientSubscriptions } = require("../db/models");
module.exports = async (req, res, next) => {
  const currentDate = new Date();

  // Find the client subscription record
  const clientSubscription = await ClientSubscriptions.findOne({
    where: {
      clientId: req.body.clientId,
    },
  });

  if (!clientSubscription) {
    next();
  } else {
    if (
      clientSubscription &&
      clientSubscription.isActive &&
      currentDate >= clientSubscription.StartDate &&
      currentDate <= clientSubscription.EndDate
    ) {
      next();
    } else {
      res.status(401).json({ message: "Subscription expired or inactive" });
    }
  }
};
