const express = require('express');
const router = express.Router();
const { protect_User } = require('../../Middlewares/protection');

const { loginUser } = require('../../Controllers/companyControllers/user_auth');

router.post('/userlogin', loginUser);

module.exports = router;