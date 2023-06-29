const express = require("express");
const positionRouter = express.Router();
const positionController = require("../controller/position.controller");
// api/position/create
positionRouter.post("/create", positionController.create);

// api/position/update
positionRouter.post("/update/:id", positionController.update);

// api/position/getall
positionRouter.get("/getall", positionController.getAll);

module.exports = positionRouter;
