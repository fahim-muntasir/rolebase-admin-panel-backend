const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bctype = require("bcrypt");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user && user?._id) {
      const isPasswordTrue = await bctype.compare(password, user.password);
      if (isPasswordTrue) {
        const data = {
          id: user._id,
          name: user.firstName + user.lastName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        };

        const token = jwt.sign({ data: data }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        res.status(200).json({ login: true, userData: data });
      } else {
        res.status(401).json({ errors: { msg: "Authentication failed!" } });
      }
    } else {
      res.status(401).json({ errors: { msg: "Authentication failed!" } });
    }
  } catch {
    res.status(401).json({ errors: { msg: "Authentication failed!" } });
  }
};

const logoutController = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ logout: true });
};

module.exports = { loginController, logoutController };
