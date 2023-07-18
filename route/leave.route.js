const express = require("express");
const leaveRouter = express.Router();
const leaveController = require("../controller/leave.controller");

// POST /api/leave/getbyid
leaveRouter.get("/:id", leaveController.getById);

// POST /api/leave
leaveRouter.post("/", leaveController.create);

// PUT /api/leave/{id}
leaveRouter.put("/:id", leaveController.update);

// DELETE /api/leave/{id}
leaveRouter.delete("/:id", leaveController.delete);

// GET /api/leave
leaveRouter.get("/", leaveController.get);

module.exports = leaveRouter;
