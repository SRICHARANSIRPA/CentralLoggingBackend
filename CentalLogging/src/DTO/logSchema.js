const {
  LogFormatValuesList,
  LogLevelValues,
  SubscriptionPeriodValuesList,
} = require("../enum");
const createLogSchema = {
  type: "object",
  properties: {
    traceId: { type: "string" },
    data: { type: "string" },
    identifier: { type: "string" },
    format: {
      type: "string",
      enum: LogFormatValuesList,
    },
    level: {
      type: "string",
      enum: LogLevelValues,
    },
    eventId: { type: "integer" },
  },
  required: ["traceId", "data", "identifier", "format", "eventId", "level"],
};

module.exports = createLogSchema;
