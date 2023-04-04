const express = require('express');
const router = express.Router();
const path = require('path');

const { storeDocuments } = require('../../Controllers/listingControllers/documentsStorage');

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/documents');
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['pdf', 'xlsx', 'docx'];
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
});

router.post('/storedocs', upload.array('docs',12), storeDocuments);
module.exports = router;