const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

module.exports = multer({ storage: storage }).single("image");
// const imageFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image")) {
//       cb(null, true);
//     } else {
//       cb("Please upload only images.", false);
//     }
//   };
  
//   var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, __basedir + "images/");
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
//     },
//   });
  
//   module.exports = multer({ storage: storage, fileFilter: imageFilter });
  //var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
  //module.exports = uploadFile;