const express = require('express');
const router = express.Router();
const path = require('path');

const { storeImages, storeWatermarkImage } = require('../../Controllers/listingControllers/imagesStorage');

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/images/watermark');
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['jpg', 'png', 'jpeg'];
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
});

router.post('/storewatermark', upload.single('watermark'), storeWatermarkImage);
module.exports = router;