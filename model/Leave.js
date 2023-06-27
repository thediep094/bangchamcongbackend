const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        reason: { type: String, required: true },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true },
);

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
