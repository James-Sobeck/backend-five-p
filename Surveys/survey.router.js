
const router = require("express").Router();
const controller = require("./survey.controller");

router.route("/questions").post(controller.create);
module.exports = router;