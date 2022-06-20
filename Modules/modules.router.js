const router = require("express").Router();
const controller = require("./modules.controller");

router.route("/module").post(controller.create)

module.exports = router;