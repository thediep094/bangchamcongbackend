const Timesheet = require("../model/Timesheet");

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
    getTimesheetById: async (req, res) => {
        const { id } = req.body;
        try {
            const timesheets = await Timesheet.find({
                id: id,
            });
            return res.status(200).json({
                message: "Success getting Timesheet",
                data: timesheets,
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
            ]);

            return res.status(200).json({
                message: `Success getting Timesheets for month ${month} year ${year}`,
                data: timesheets,
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
};

module.exports = TimesheetController;
