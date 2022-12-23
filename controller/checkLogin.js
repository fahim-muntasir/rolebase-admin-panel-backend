const checkLoginController = (req, res) => {
  res.status(200).json({ login: true, userData: req.data });
};

module.exports = checkLoginController;
