const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timesheetSchema = new Schema({
    check_in: { type: Date, required: true },
    check_out: { type: Date },
    id: { type: String, required: true },
});

const Timesheet = mongoose.model("Timesheet", timesheetSchema);
module.exports = Timesheet;
