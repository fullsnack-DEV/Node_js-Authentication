const express = require("express");

const router = express.Router();
const { Getprivateroute } = require("../controllers/Privateroutecontroller");
const { Protected } = require("../middlewares/Protectedauthroutes");

router.route("/").get(Protected, Getprivateroute);

module.exports = router;
