

const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Create multer upload instance
const upload = multer({ storage: storage });

// Middleware to handle file uploads
const uploadPropertyImagesMiddleware = (req, res, next) => {
    upload.fields([
        { name: 'primary_picture', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ])(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (req.files['primary_picture']) {
            req.body.primary_picture = `${process.env.BASE_URL}/uploads/${req.files['primary_picture'][0].filename}`;
        }
        if (req.files['images']) {  
            req.body.images = req.files['images'].map(file => `${process.env.BASE_URL}/uploads/${file.filename}`);
        } else {
            req.body.images = [];
        }
        next();
    });
};

module.exports=uploadPropertyImagesMiddleware