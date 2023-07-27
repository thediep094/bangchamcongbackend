const express = require("express");
const router = express.Router();
const userRouter = require("./user.route");
const timesheetRouter = require("./timesheet.route");
const authRouter = require("./auth.route");
const positionRouter = require("./position.route");
const leaveRouter = require("./leave.route");
const lateRouter = require("./late.route");

router.use("/user", userRouter);
router.use("/timesheet", timesheetRouter);
router.use("/auth", authRouter);
router.use("/position", positionRouter);
router.use("/leave", leaveRouter);
router.use("/late", lateRouter);

module.exports = router;
