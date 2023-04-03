// const { SubscriptionPeriodValues } = require("../enum");
const generateRandomString = require("../utils/randomString");
const {
  SubscriptionPeriodValues,
  LogFormatValues,
  SubscriptionPeriodValuesList,
} = require("../enum");
const { Op } = require("sequelize");
const {
  Client,
  ClientUsers,
  ClientPermissions,
  ClientSubscriptions,
  SubscriptionTypes,
  ClientAllowedFormats,
  ClientLogLimitRules,
} = require("../db/models");
const validateClient = require("../Validations/clientValidator");
const asyncFunction = require("../utils/aysncFunction");

class ClientService {
  constructor() {
    // Initialize any properties or dependencies needed by the service
    // this.client = Client.findOne({
    //   where: {
    //     id,
    //   },
    // });
  }

  async checkForExistingClient(name, organizationId) {
    const client = await Client.findOne({
      where: {
        [Op.or]: [{ name: name }, { organizationId: organizationId }],
      },
    });
    console.log(`Exisintng cient...${JSON.stringify(client)}`);
    return client ? true : false;
  }

  async createClient(input) {
    const validate = validateClient(input);
    if (validate === true) {
      const { name, organizationId, subscriptionType, logFormats } = input;
      if (await this.checkForExistingClient(name, organizationId)) {
        throw Error("Client Exists");
      }
      return await asyncFunction(async () => {
        //Creating Client
        const newClient = await Client.create({ name, organizationId });

        if (!newClient) {
          throw new Error("Failed to create new client.");
        }

        console.log(`Created Client...${JSON.stringify(newClient)}`);

        //creating Cleint Permissions
        const clientPermissionData = {
          accessKey: generateRandomString(10),
          isBlocked: false,
          clientId: newClient.id,
        };
        console.log(clientPermissionData);
        const clientPermissions = await ClientPermissions.create(
          clientPermissionData
        );

        console.log(
          `Created clientPermissions...${JSON.stringify(clientPermissions)}`
        );

        //creating Client SubscriptionType
        const subscriptiontype = await SubscriptionTypes.findOne({
          where: {
            Type: subscriptionType,
          },
        });
        console.log(`subscription Type....${JSON.stringify(subscriptiontype)}`);

        const clientSubscriptionData = {
          isActive: true,
          clientId: newClient.id,
          subscriptionId: subscriptiontype.id,
          StartDate: new Date(),
          EndDate: this.addDays(
            this.getSubscriptionDays(subscriptiontype.Type)
          ),
        };
        console.log(clientSubscriptionData);
        const clientSubscriptions = await ClientSubscriptions.create(
          clientSubscriptionData
        );

        // Creating Client Alloed Formats
        logFormats.map(async (logFormat) => {
          await ClientAllowedFormats.create({
            clientId: newClient.id,
            format: logFormat,
            isActive: true,
          });
        });

        //Creating Client ClientLogLimitRules
        SubscriptionPeriodValuesList.map(async (period) => {
          await ClientLogLimitRules.create({
            period: period,
            Limit: this.getPeriodLimit(period),
            clientId: newClient.id,
          });
        });

        return {newClient,clientPermissions};
      });
    } else {
      return validate.errors;
    }
  }

  getPeriodLimit(period) {
    const periodLimits = {
      Quarterly: 100,
      Monthly: 20,
      Yearly: 200,
    };
    return periodLimits[period];
  }

  getSubscriptionDays(type) {
    const SubscriptionTypeDays = {
      Quarterly: 90,
      Monthly: 30,
      Yearly: 365,
    };
    return SubscriptionTypeDays[type];
  }

  addDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
}

module.exports = ClientService;
