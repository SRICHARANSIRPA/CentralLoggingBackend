const router = require("express").Router();
const checkSubscriptionValidity = require("../middlewares/checkSubscriptionValidity");
const { LoggerController } = require("../controllers");
const { Op } = require("sequelize");
const auth = require("../middlewares/auth");
const event = require("../middlewares/event");
const Limiter = require("../middlewares/LogRateLimiter");
const LogAllowedFormat = require("../middlewares/LogAllowedFormat");
router
  .route("/")
  .post(
    [auth, LogAllowedFormat, checkSubscriptionValidity, event, Limiter],
    LoggerController.createLog
  )
  .get(LoggerController.get);

// router.route("/viewLogs", [auth], LoggerController.getViewLogs);
router.route("/download").get(LoggerController.downloadLogs);

router.route("/Log/:logId").get(LoggerController.getLog);
// .put(LoggerController.editUser)
// .patch(() => {});

module.exports = router;
