const { Op } = require("sequelize");
const {
  SubscriptionPeriodValues,
  SubscriptionPeriodValuesList,
} = require("../enum");

const {
  ClientDailyLogs,
  ClientMonthlyLogs,
  ClientLogLimitRules,
} = require("../db/models");

const getClientLogLimitRules = async (clientid) => {
  const rules = await ClientLogLimitRules.findAll({
    where: {
      clientId: clientid,
    },
  });
  return rules.reduce((acc, rule) => {
    acc[rule.period] = rule.Limit;
    return acc;
  }, {});
};

module.exports = async (req, res, next) => {
  const { clientId: clientid } = req.body;
  console.log(req.body);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dailyLog = await ClientDailyLogs.findOne({
    where: {
      clientId: clientid,
      date: {
        [Op.gte]: today,
      },
    },
  });

  const currentMonth = new Date().getMonth() + 1;
  today.setHours(0, 0, 0, 0);
  const monthlyLog = await ClientMonthlyLogs.findOne({
    where: {
      clientId: clientid,
      month: currentMonth,
      year: new Date().getFullYear(),
    },
  });

  console.log(monthlyLog, typeof dailyLog);

  if (dailyLog === null || monthlyLog === null) {
    next();
  } else {
    const rules = await getClientLogLimitRules(clientid);
    console.log(rules, dailyLog);
    let limitExceeded = false;

    SubscriptionPeriodValuesList.forEach((period) => {
      if (rules[period]) {
        if (dailyLog.count > rules[period]) {
          limitExceeded = true;
        }
      }
    });

    if (limitExceeded) {
      return res.status(400).json({
        message: "Log limit exceeded",
      });
    }

    next();
  }
};
