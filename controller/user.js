const User = require("../models/user");
const bcrypt = require("bcrypt");

// CREATE USER
const addUser = async (req, res) => {
  const { firstName, lastName, email, userRole, password } = req.body;
  if (req.files.length > 0) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const createUser = new User({
        firstName,
        lastName,
        email,
        role: userRole,
        avatar: req.files[0].filename,
        password: hashPassword,
      });
      await createUser.save();

      res.status(200).json({ msg: "User create successfull." });
    } catch {
      res
        .status(500)
        .json({ globalError: { msg: "Something is wrong on user create!" } });
    }
  } else {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const createUser = new User({
        firstName,
        lastName,
        email,
        role: userRole,
        password: hashPassword,
      });
      await createUser.save();

      res.status(200).json({ msg: "User create successfull." });
    } catch {
      res
        .status(500)
        .json({ globalError: { msg: "Something is wrong on user create!" } });
    }
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

module.exports = { addUser, getUsers, getUsersByRole };
