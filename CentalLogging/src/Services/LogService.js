const { Op } = require("sequelize");
const { validateLogInput } = require("../Validations/LogValidations");
const {
  Logs,
  ClientDailyLogs,
  LogDataSource,
  ClientMonthlyLogs,
} = require("../db/models");
const atomicFunction = require("../utils/atomicFunction");
class Logservice {
  async ValidateLogInput(input) {
    return validateLogInput(input);
  }
  async createLog(input) {
    return await atomicFunction(async () => {
      const {
        traceId,
        data,
        identifier,
        format,
        eventId: eventid,
        clientId: clientid,
        level: logLevel,
      } = input;
      console.log(`Invoked Log Service create.. ${input}`);
      //Creating LogDataSource
      const logdataSource = {
        Type: format,
        Value: data,
      };
      const logDataSource = await LogDataSource.create(logdataSource);

      //creating Log
      const logData = {
        Traceid: traceId,
        LogIdentifier: identifier,
        dataSourceId: logDataSource.id,
        eventId: eventid,
        level: logLevel,
        clientId: clientid,
      };
      console.log(logData);
      const newLog = await Logs.create(logData);

      //creating  or updating ClientDailyLogs
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const [dailyLog, createdDailyLog] = await ClientDailyLogs.findOrCreate({
        where: {
          clientId: clientid,
          date: {
            [Op.gte]: today,
          },
        },
        defaults: {
          count: 0,
          date: new Date(),
          clientId: clientid,
        },
      });
      await dailyLog.increment("count");
      if (createdDailyLog) {
        console.log("Created new daily log record:", dailyLog.toJSON());
      } else {
        console.log("Found existing daily log record:", dailyLog.toJSON());
      }

      //creating  or updating ClientDailyLogs
      const currentMonth = new Date().getMonth() + 1;
      today.setHours(0, 0, 0, 0);
      const [monthlyLog, createdMonthlyLog] =
        await ClientMonthlyLogs.findOrCreate({
          where: {
            clientId: clientid,
            month: currentMonth,
            year: new Date().getFullYear(),
          },
          defaults: {
            count: 0,
            clientId: clientid,
            month: currentMonth,
            year: new Date().getFullYear(),
          },
        });

      await monthlyLog.increment("count");
      if (monthlyLog) {
        console.log("Created new monthlyLog record:", monthlyLog.toJSON());
      } else {
        console.log("Found existing monthlyLog record:", monthlyLog.toJSON());
      }
      console.log();
      return newLog.Traceid;
    });
  }

  async getFilterLogs(filters) {
    const { startDate, endDate, traceId, identifier, clientId } = filters;
    const queryFilters = { clientId };

    //adding Remaning  Filters to Query Fiters
    if (startDate && endDate) {
      queryFilters.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      queryFilters.createdAt = {
        [Op.gte]: new Date(startDate),
      };
    } else if (endDate) {
      queryFilters.createdAt = {
        [Op.lte]: new Date(endDate),
      };
    }

    if (traceId) {
      queryFilters.TraceId = traceId;
    }

    if (identifier) {
      queryFilters.LogIdentifier = identifier;
    }
    console.log(`filters....${JSON.stringify(queryFilters)}`);

    const logs = await Logs.findAll({
      where: queryFilters,
      include: [
        {
          model: LogDataSource,
          attributes: ["Type", "Value"],
          foreignKey: "dataSourceId",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const mappedLogs = logs.map((log) => ({
      Type: log.level,
      format: log.LogDataSource.Type,
      data: log.LogDataSource.Value,
      date: log.createdAt,
      TraceId: log.Traceid,
      Identifier: log.LogIdentifier,
    }));
    return mappedLogs;
  }
}

module.exports = Logservice;
