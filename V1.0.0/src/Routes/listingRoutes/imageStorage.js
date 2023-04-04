const express = require('express');
const router = express.Router();
const path = require('path');

const { storeImages } = require('../../Controllers/listingControllers/imagesStorage');

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/images');
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

router.post('/storeimage', upload.array('images',12), storeImages);
module.exports = router;