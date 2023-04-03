const router = require("express").Router();
const { ClientController } = require("../controllers");

router
  .route("/")
  .post(async (req, res, next) => {
    return await ClientController.createClient(req, res, next);
  })
  .get(ClientController.get);

router
  .route("/:clientId")
  .get(ClientController.getClients)
  .put(ClientController.editUser)
  .delete(ClientController.deleteUser)
  .patch(() => {});

module.exports = router;
