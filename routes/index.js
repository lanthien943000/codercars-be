const { sendResponse, AppError } = require("../helpers/utils.js");

var express = require("express");
var router = express.Router();

/* GET home page. */

const carRouter = require("./car.api.js");
router.use("/cars", carRouter);

module.exports = router;
