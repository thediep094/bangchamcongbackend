const Position = require("../model/Position");
const mongoose = require("mongoose");

const PositionController = {
    create: async (req, res) => {
        try {
            const newPosition = await Position.create(req.body);
            return res.status(200).json({
                message: "Success creation of Timesheet",
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
            const { id } = req.params;
            const positions = await Position.findByIdAndUpdate(id, req.body);
            return res.status(200).json({
                message: "Success creation of positions",
                data: positions,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const positions = await Position.find();
            return res.status(200).json({
                message: "Success get all of positions",
                data: positions,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
};

module.exports = PositionController;
