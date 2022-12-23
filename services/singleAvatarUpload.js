const multer = require("multer");
const path = require("path");

const singleAvatarUpload = (fileName, fileSize) => {
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${fileName}/`;
  const storage = multer.diskStorage({
    destination: (req, file, cd) => {
      cd(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  const upload = multer({ storage: storage, limits: { fileSize: fileSize } });

  return upload;
};

module.exports = singleAvatarUpload;
