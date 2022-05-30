const router = require("express").Router();
const controller = require("./organization.controller");

router.route("/register").post(controller.create);