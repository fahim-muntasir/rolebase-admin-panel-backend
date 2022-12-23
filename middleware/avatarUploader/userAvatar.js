const singleAvatarUpload = require("../../services/singleAvatarUpload");

const userAvatarUpload = (req, res, next) => {
  const upload = singleAvatarUpload("images", 1000000);

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({ errors: err });
    } else {
      next();
    }
  });
};

module.exports = userAvatarUpload;
