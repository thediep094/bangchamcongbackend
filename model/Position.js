const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionSchema = new Schema(
    {
        salary: { type: Number, require: true, default: 0 },
        name: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const Position = mongoose.model("Position", PositionSchema);
module.exports = Position;
