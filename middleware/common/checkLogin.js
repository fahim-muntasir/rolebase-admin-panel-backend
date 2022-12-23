const jwt = require("jsonwebtoken");

const checkLogin = async (req, res, next) => {
  const cookie =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookie) {
    try {
      const tokenVerification = await jwt.verify(
        cookie[process.env.COOKIE_NAME],
        process.env.JWT_SECRET
      );
      if (tokenVerification && tokenVerification?.data) {
        req.data = tokenVerification.data;
        next();
      } else {
        res.status(401).json({ error: { msg: "Authontication failed!3" } });
      }
    } catch {
      res.status(401).json({ error: { msg: "Authontication failed!2" } });
    }
  } else {
    res.status(401).json({ error: { msg: "Authontication failed!1" } });
  }
};

module.exports = checkLogin;
