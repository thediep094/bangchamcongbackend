const Timesheet = require("../model/Timesheet");
const User = require("../model/User");

const TimesheetController = {
    create: async (req, res) => {
        try {
            const newTimesheet = await Timesheet.create(req.body);
            return res.status(200).json({
                message: "Success creation of Timesheet",
                data: newTimesheet,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params; // Assuming the id is passed as a route parameter
        try {
            const timesheet = await Timesheet.findById(id);

            if (!timesheet) {
                return res.status(404).json({
                    message: "Timesheet not found",
                });
            }

            return res.status(200).json({
                message: "Success getting Timesheet",
                data: timesheet,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },

    getTimesheetById: async (req, res) => {
        const { id } = req.body;
        try {
            const timesheets = await Timesheet.find({
                id: id,
            }).sort({ createdAt: -1 });

            const user = await User.findOne({
                id: id,
            });

            return res.status(200).json({
                message: "Success getting Timesheet",
                data: timesheets,
                user: user,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
    getTimesheetsByMonth: async (req, res) => {
        try {
            const { month, year, id } = req.body;

            let matchQuery = { id: id };

            if (month) {
                matchQuery.month = month;
            }

            if (year) {
                matchQuery.year = year;
            }

            const user = await User.findOne({
                id: id,
            }).populate("position");

            const timesheets = await Timesheet.aggregate([
                {
                    $addFields: {
                        month: { $month: "$check_in" },
                        year: { $year: "$check_in" },
                    },
                },
                {
                    $match: matchQuery,
                },
            ]).sort({ createdAt: -1 });

            return res.status(200).json({
                message: `Success getting Timesheets for month ${month} year ${year}`,
                data: timesheets,
                user: user,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },

    getTimesheetsByYear: async (req, res) => {
        try {
            const { year, id } = req.body; // Example: retrieve timesheets for July (month number: 7)
            const timesheets = await Timesheet.aggregate([
                {
                    $addFields: {
                        year: { $year: "$check_in" },
                    },
                },
                {
                    $match: {
                        id: id,
                        year: year,
                    },
                },
            ]);

            return res.status(200).json({
                message: `Success getting Timesheets for year ${year}`,
                data: timesheets,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },

    updateById: async (req, res) => {
        const { id, check_in, check_out } = req.body;
        try {
            const updatedTimesheet = await Timesheet.findByIdAndUpdate(
                id,
                { check_in, check_out },
                { new: true },
            );

            if (!updatedTimesheet) {
                return res.status(404).json({
                    message: "Timesheet not found",
                });
            }

            return res.status(200).json({
                message: "Success updating Timesheet",
                data: updatedTimesheet,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
};

module.exports = TimesheetController;
