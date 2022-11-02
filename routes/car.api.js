const express = require("express");
const router = express.Router();
const {
  createCar,
  getCars,
  updateCar,
  deleteCar,
} = require("../controllers/car.controllers.js");

//Read
router.get("/", getCars);

//Create
router.post("/", createCar);

//Update
router.put("/:id", updateCar);

//Delete
router.delete("/:id", deleteCar);

//export
module.exports = router;
