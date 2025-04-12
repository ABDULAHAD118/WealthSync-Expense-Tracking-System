const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const storage = multer.memoryStorage();

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPG,JPEG and PNG are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2.5 }, // 2.5 MB limit
    fileFilter: fileFilter,
}).single('image');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageMiddleware = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File size exceeds 2.5 MB' });
            }
            return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
            const result = await cloudinary.uploader.upload_stream(
                { folder: '/wealthSync' },
                (error, result) => {
                    if (error) {
                        return res
                            .status(500)
                            .json({ message: 'Cloudinary upload failed', error: error.message });
                    }
                    req.imageURL = result?.url;
                    next();
                }
            );
            result.end(req.file.buffer);
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Failed to upload image', error: error.message });
        }
    });
};

module.exports = uploadImageMiddleware;
