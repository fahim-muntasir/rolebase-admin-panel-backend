const singleAvatarUpload = require("../../services/singleAvatarUpload");

const productAvatarUpload = (req, res, next) => {
  const upload = singleAvatarUpload("productImages", 1000000);

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({ errors: err });
    } else {
      next();
    }
  });
};

module.exports = productAvatarUpload;
