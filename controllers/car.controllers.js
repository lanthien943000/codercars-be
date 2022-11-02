const { sendResponse, AppError } = require("../helpers/utils.js");

const Car = require("../models/Car.js");

const carController = {};

//Create a car
carController.createCar = async (req, res, next) => {
  //in real project you will getting info from req
  try {
    const info = req.body;
    //always remember to control your inputs
    if (!info) throw new AppError(402, "Bad Request", "Create Car Error");
    //mongoose query
    const created = await Car.create(info);
    sendResponse(res, 200, true, { car: created }, null, "Create Car Success");
  } catch (err) {
    next(err);
  }
};

//Get all car
carController.getCars = async (req, res, next) => {
  //in real project you will getting condition from from req then construct the filter object for query
  try {
    //mongoose query
    let { page } = req.query;
    page = parseInt(page) || 1;
    const limit = 10;
    let offset = limit * (page - 1);
    let listCars = await Car.find();
    listCars = listCars.reverse().slice(offset, offset + limit);
    let totalCars = await Car.find().countDocuments();
    let totalPage = Math.ceil(totalCars / limit);
    let data = { cars: listCars, page: page, totalPage: totalPage };
    sendResponse(res, 200, true, data, null, "get list of cars success");
  } catch (err) {
    next(err);
  }
};

//Update a car
carController.updateCar = async (req, res, next) => {
  try {
    if (!req.body || !req.params.id)
      throw new AppError(400, "No request body or no car id", "Bad Request");

    const { id } = req.params;
    const updateInfo = req.body;
    const options = { new: true };
    //mongoose query
    const updated = await Car.findByIdAndUpdate(id, updateInfo, options);

    sendResponse(res, 200, true, { car: updated }, null, "Update car success");
  } catch (err) {
    next(err);
  }
};

//Delete car
carController.deleteCar = async (req, res, next) => {
  try {
    if (!req.params.id) throw new AppError(400, "No car id", "Bad Request");

    const { id } = req.params;
    const options = { new: true };
    //mongoose query
    const updated = await Car.findByIdAndDelete(id, options);

    sendResponse(res, 200, true, { car: updated }, null, "Delete car success");
  } catch (err) {
    next(err);
  }
};

//export
module.exports = carController;
