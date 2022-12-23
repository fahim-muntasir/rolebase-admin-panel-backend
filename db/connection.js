const mongoose = require("mongoose");

const DBConnect = (url) => {
  return mongoose.connect(url);
};

module.exports = DBConnect;
