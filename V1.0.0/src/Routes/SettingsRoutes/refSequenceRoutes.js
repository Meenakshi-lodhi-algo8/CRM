const express = require('express');
const router = express.Router();

const { refSequencing, fetchSequence } = require('../../Controllers/settingsControllers/refSequencing');
const { protect_Company } = require('../../Middlewares/protection');

// add middlewares to protect this route and also check if company is authorised to access 
router.post('/:companyid/refsequence', protect_Company, refSequencing);

router.get('/:companyid/refsequence', protect_Company, fetchSequence);
router.post('/:companyid/addWatermark', protect_Company, fetchSequence);



module.exports = router;