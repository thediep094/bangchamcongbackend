const express = require("express");
const lateMoneyRouter = express.Router();
const lateMoneyController = require("../controller/late.controller");
// POST /api/leave/getbyid
lateMoneyRouter.post("/", lateMoneyController.create);
// POST /api/leave/getbyid
lateMoneyRouter.get("/", lateMoneyController.get);
// PUT /api/leave/{id}
lateMoneyRouter.put("/", lateMoneyController.update);

module.exports = lateMoneyRouter;
