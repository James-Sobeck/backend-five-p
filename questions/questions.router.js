
const router = require("express").Router();
const controller = require("./questions.controller");

router.route("/questions").post(controller.create);
module.exports = router;