const {
  LogFormatValuesList,
  SubscriptionPeriodValuesList,
} = require("../enum");
const createClientSchema = {
  type: "object",
  properties: {
    organizationId: { type: "string" },
    name: { type: "string" },
    subscriptionType: { type: "string", enum: SubscriptionPeriodValuesList },
    logLimits: {
      type: "object",
      properties: {
        Monthly: { type: "integer" },
        Daily: { type: "integer" },
      },
    },
    logFormats: {
      type: "array",
      items: { type: "string", enum: LogFormatValuesList },
    },
  },
  required: [
    "organizationId",
    "name",
    "subscriptionType",
    "logLimits",
    "logFormats",
  ],
};

module.exports = createClientSchema;
