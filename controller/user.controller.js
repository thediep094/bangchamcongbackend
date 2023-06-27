const { v4: uuidv4 } = require("uuid");
const User = require("../model/User");
const UserController = {
    create: async (req, res) => {
        try {
            const id = uuidv4();

            const newUser = await User.create({
                ...req.body,
                id: id,
            });
            return res.status(200).json({
                message: "User created successfully",
                user: newUser,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
    getAlls: async (req, res) => {
        try {
            const users = await User.find();
            return res.status(200).json({
                message: "Users get successfully",
                users: users,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const id = req.body.verify_id || req.params.id;
            const data = await User.findById(id).select("-password");

            if (data) {
                return res.status(200).json({
                    message: "User get successfully",
                    user: data,
                });
            }

            return res.status(404).json({
                message: "User not found",
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
            const data = await User.findByIdAndUpdate(id, req.body);
            const data2 = await User.findByIdAndUpdate(id);

            if (data) {
                return res.status(200).json({
                    message: "Updated successfully",
                    user: data2,
                });
            } else {
                return res.status(404).json({
                    message: "User not found",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await User.findByIdAndDelete(id);
            if (data) {
                return res.status(200).json({
                    message: "Delete successfully",
                    // user: data,
                });
            }
            return res.status(404).json({
                message: "User does not exist",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },

    uploadImg: async (req, res) => {
        try {
            return res
                .status(200)
                .json({ message: "Image uploaded successfully" });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
};
module.exports = UserController;