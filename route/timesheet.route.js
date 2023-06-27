const express = require("express");
const timesheetRouter = express.Router();
const timesheetController = require("../controller/timesheet.controller");
// api/timesheet/getbyid
timesheetRouter.post("/getbyid", timesheetController.getTimesheetsByMonth);

// api/timesheet/admin/getbymonth/
timesheetRouter.post(
    "/admin/getbyid",
    timesheetController.getTimesheetsByMonth,
);

// api/timesheet/admin/getbyyêar/
timesheetRouter.post(
    "/admin/getbyyear",
    timesheetController.getTimesheetsByYear,
);
module.exports = timesheetRouter;
