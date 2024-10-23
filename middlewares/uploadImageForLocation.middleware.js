const multer = require("multer");
const path = require("path");
require("dotenv").config()
// تكوين multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // تحديد مجلد الرفع
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // تسمية الملف
  }
});

const upload = multer({ storage: storage });

const uploadImageForLocationMiddleware = (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status: 'fail', error: [err.message] });
    } else if (err) {
      return res.status(500).json({ status: 'fail', error: [err.message] });
    }

    if (req.file) {
      req.body.image = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }
    next();
  });
};

module.exports = uploadImageForLocationMiddleware;