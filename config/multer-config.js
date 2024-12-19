const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storge: storage });

module.exports = upload;
