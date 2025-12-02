const express = require("express");
const app = express();
const router = express.Router();

const authcontroller = require("../controllers/auth_controller");

router.route("/" ).get(authcontroller.home); 

router.route("/register" ).post(authcontroller.register);

router.route("/login" ).post(authcontroller.login);

module.exports = router;
