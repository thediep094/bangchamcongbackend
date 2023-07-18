const Leave = require("../model/Leave");

const LeaveController = {
    create: async (req, res) => {
        try {
            const newLeave = await Leave.create(req.body);
            return res.status(200).json({
                message: "Success creation of leave",
                data: newLeave,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },

    delete: async (req, res) => {
        try {
            const leaveId = req.params.id;
            await Leave.findByIdAndRemove(leaveId);
            return res.status(200).json({
                message: "Leave deleted successfully",
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
            const leaveId = req.params.id;
            const updatedLeave = await Leave.findByIdAndUpdate(
                leaveId,
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
            const leaves = await Leave.find()
                .sort({ createdAt: -1 })
                .populate({
                    path: "user",
                    select: "fullname date username",
                })
                .exec();
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

    getById: async (req, res) => {
        try {
            const userId = req.params.id;
            const leave = await Leave.find({
                user: userId,
            })
                .sort({ createdAt: -1 })
                .populate({
                    path: "user",
                    select: "fullname date username",
                })
                .exec();
            if (!leave) {
                return res.status(404).json({
                    message: "Leave not found",
                });
            }
            return res.status(200).json({
                message: "Success",
                data: leave,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
};

module.exports = LeaveController;
