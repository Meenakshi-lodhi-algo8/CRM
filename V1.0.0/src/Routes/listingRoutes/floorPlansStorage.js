const express = require('express');
const router = express.Router();
const path = require('path');

const { storeFloorPlans } = require('../../Controllers/listingControllers/floorPlansStorage');

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/floorPlans');
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['jpg', 'png'];
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
});

router.post('/storefloorplans', upload.array('images',12), storeFloorPlans);
module.exports = router;