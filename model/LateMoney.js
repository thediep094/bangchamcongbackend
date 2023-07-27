const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LateMoneySchema = new Schema({
    money: Number,
});

const LateMoney = mongoose.model("LateMoney", LateMoneySchema);
module.exports = LateMoney;
