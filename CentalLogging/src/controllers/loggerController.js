const { Op } = require("sequelize");
const csvGenerator = require("../utils/csvGenerator");
const logCsvHeaders = require("../DTO/csvLogHeaders");
const loggerController = {};
const { Logs, LogDataSource, Events } = require("../db/models");
const Logservice = require("../Services/LogService");
function findOne(id) {
  return Logs.findOne({
    where: {
      id,
    },
  });
}

loggerController.createLog = async (req, res, next) => {
  try {
    console.log("Invoked Logger Controller");
    const logService = new Logservice();
    const validate = await logService.ValidateLogInput(req.body);
    if (validate === true) {
      const traceId = await logService.createLog(req.body);
      return res.status(201).send({ traceId });
    } else {
      console.log(`errors:${validate.errors} ${validate}`);
      return res.status(400).send(validate.errors);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
  // Logs.create(req.body)
  //   .then((u) => res.json(u))
  //   .catch(next);
};

loggerController.getViewLogs = async (req, res, next) => {
  try {
    const logService = new Logservice();
    return await logService.getFilterLogs(req.params.filters);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

loggerController.get = async (req, res, next) => {
  try {
    const logService = new Logservice();
    const logs = await logService.getFilterLogs({
      clientId: req.body.clientId,
    });
    return res.status(200).send(logs);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

loggerController.downloadLogs = async (req, res, next) => {
  try {
    console.log(`params$$$$ ${JSON.stringify(req.query)}`);
    const logService = new Logservice();
    const logs = await logService.getFilterLogs(req.query);
    console.log(logs);

    return res.send(logs);
    //convertting to CSV
    const fileName = `logs-${Date.now()}.csv`;
    // const csvData = await csvGenerator(logCsvHeaders, fileName, logs);
    console.log(csvData);
    // return res.download(`./${fileName}`, fileName, (err) => {
    //   if (err) {
    //     console.log("Error while downloading file: ", err);
    //     res.status(500).send("Error while downloading file");
    //   } else {
    //     // Delete the generated CSV file after it has been sent as a response
    //     fs.unlink(`./${fileName}`, (err) => {
    //       if (err) {
    //         console.log("Error while deleting CSV file: ", err);
    //       }
    //     });
    //   }
    // });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

loggerController.getLog = (req, res, next) => {
  const id = req.params.logId;
  findOne(id)
    .then((user) => {
      if (user && user.length) {
        res.json(user);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};

loggerController.getLogs = (req, res, next) => {
  const id = req.params.traceId;
  findOne(id)
    .then((users) => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};

loggerController.editUser = (req, res, next) => {
  const newLog = req.body;
  const id = newLog ? newLog.id : undefined;
  findOne(id)
    .then((log) => {
      if (log) {
        Object.assign(log, newlog);
        log
          .save()
          .then((log) => res.json(log))
          .catch(next);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};

module.exports = loggerController;
