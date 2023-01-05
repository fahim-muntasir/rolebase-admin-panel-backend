const User = require("../models/user");
const bcrypt = require("bcrypt");

// CREATE USER
const addUser = async (req, res) => {
    const { firstName, lastName, email, userRole, password } = req.body;

    let permission = null;
    if (userRole === "admin") {
        permission = {
            product: { create: true, read: true, update: true, delete: true },
        };
    } else {
        permission = {
            product: {
                create: false,
                read: false,
                update: false,
                delete: false,
            },
        };
    }

    if (req.files?.length > 0) {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const createUser = new User({
                firstName,
                lastName,
                email,
                role: userRole,
                avatar: req.files[0].filename,
                permission,
                password: hashPassword,
            });
            await createUser.save();

            res.status(200).json({ msg: "User create successfull." });
        } catch {
            res.status(500).json({
                globalError: { msg: "Something is wrong on user create1!" },
            });
        }
    } else {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const createUser = new User({
                firstName,
                lastName,
                email,
                role: userRole,
                permission,
                password: hashPassword,
            });
            await createUser.save();

            res.status(200).json({ msg: "User create successfull." });
        } catch {
            res.status(500).json({
                globalError: { msg: "Something is wrong on user create2!" },
            });
        }
    }
};

// GET SINGLE USER
const getUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const users = await User.find({ _id: userId }).select({
            password: 0,
            __v: 0,
        });

        res.status(200).json(users);
    } catch {
        res.status(500).json({ errors: { msg: "User not found!" } });
    }
};

// GET ALL USERS
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select({
            password: 0,
            __v: 0,
        });

        res.status(200).json(users);
    } catch {
        res.status(500).json({ errors: { msg: "User not found!" } });
    }
};

// GET USER BY ROLE
const getUsersByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const users = await User.find({ role: role }).select({
            password: 0,
            __v: 0,
        });
        res.status(200).json(users);
    } catch {
        res.status(500).json({ errors: { msg: "User not found!" } });
    }
};

// DELETE USER
const deleteUser = async (req, res) => {
    const userId = JSON.parse(req.params.userId);
    try {
        await User.deleteMany({ _id: userId });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({
            errors: {
                msg: "Somthing is wrong User is not deleted!",
            },
        });
    }
};

// UPDATE USER PERMISSION
const updateUserPersmission = async (req, res) => {
    const { permission } = req.body;
    const userId = req.params.userId;
    try {
        await User.updateOne({ _id: userId }, { $set: { permission } });
        res.status(200).json({ msg: "User update successfull." });
    } catch (error) {
        res.status(500).json({
            errors: {
                msg: "Somthing is wrong User is not updated!",
            },
        });
    }
};

module.exports = {
    addUser,
    getUsers,
    getUsersByRole,
    deleteUser,
    updateUserPersmission,
    getUser,
};
