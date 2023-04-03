const LogFormatValues = {
  JSON: "JSON",
  TEXT: "Text",
  XML: "XML",
  FILE: "File",
};

const SubscriptionPeriodValues = {
  Quarterly: "Quarterly",
  Monthly: "Monthly",
  Yearly: "Yearly",
};

const LogLevel = {
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

module.exports = {
  LogLevel,
  LogLevelValues: [LogLevel.Error, LogLevel.Info, LogLevel.Warning],
  LogFormatValues: Object.freeze(LogFormatValues),
  LogFormatValuesList: [
    LogFormatValues.FILE,
    LogFormatValues.JSON,
    LogFormatValues.TEXT,
    LogFormatValues.XML,
  ],
  SubscriptionPeriodValues: Object.freeze(SubscriptionPeriodValues),
  SubscriptionPeriodValuesList: [
    SubscriptionPeriodValues.Quarterly,
    SubscriptionPeriodValues.Monthly,
    SubscriptionPeriodValues.Yearly,
  ],
};
