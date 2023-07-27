const LateMoney = require("../model/LateMoney");

const LateMoneyController = {
    create: async (req, res) => {
        try {
            const newPosition = await LateMoney.create(req.body);
            return res.status(200).json({
                message: "Success creation of Late money",
                data: newPosition,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
    update: async (req, res) => {
        try {
            const lateId = "64c2261d83dc05dc7ea2efa8";
            const updatedLeave = await LateMoney.findByIdAndUpdate(
                lateId,
                req.body,
                { new: true },
            );
            return res.status(200).json({
                message: "Leave updated successfully",
                data: updatedLeave,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },

    get: async (req, res) => {
        try {
            const lateId = "64c2261d83dc05dc7ea2efa8";
            const leaves = await LateMoney.findById(lateId);

            return res.status(200).json({
                message: "Success",
                data: leaves,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
};

module.exports = LateMoneyController;
