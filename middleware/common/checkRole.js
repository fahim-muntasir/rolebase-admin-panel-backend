const checkRoleForUpdateProductImg = (req, res, next) => {
  if (req.data.role === "admin" || req.data.role === "worker") {
    next();
  } else {
    res
      .status(403)
      .json({ errors: { msg: "You are not allow for edit this!" } });
  }
};

module.exports = { checkRoleForUpdateProductImg };
