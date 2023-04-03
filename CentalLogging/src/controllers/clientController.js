const clientController = {};
const { Client } = require("../db/models");
const clientService = require("../Services/ClientService");
function findOne(id) {
  return Client.findOne({
    where: {
      id,
    },
  });
}

clientController.createClient = async (req, res, next) => {
  console.log(`Invoked create clinet....r${JSON.stringify(req.body)}`);
  // console.log(req);
  try {
    const ClientService = new clientService();
    const { organizationId, name } = req.body;
    const existingClient = await ClientService.checkForExistingClient(
      name,
      organizationId
    );
    if (existingClient) {
      res.status(200).send("Client Already Existing");
    }
    const client = await ClientService.createClient(req.body);
    console.log("result client" + client);
    res.status(201).send(client);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

clientController.get = (req, res, next) => {
  console.log("get alll ");
  Client.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};

clientController.getClient = (req, res, next) => {
  const id = req.params.userId;
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

clientController.getClients = (req, res, next) => {
  const id = req.params.clientId;
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

clientController.editUser = (req, res, next) => {
  const newUser = req.body;
  const id = newUser ? newUser.id : undefined;
  findOne(id)
    .then((user) => {
      if (user) {
        Object.assign(user, newUser);
        user
          .save()
          .then((user) => res.json(user))
          .catch(next);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};

clientController.deleteUser = (req, res, next) => {
  const id = req.params.userId;
  findOne(id)
    .then((user) => {
      if (user) {
        user.destroy().then(res.status(200).send()).catch(next);
      } else {
        a;
        res.status(404).send();
      }
    })
    .catch(next);
};

module.exports = clientController;
