const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');

const Super_Admin = require('../../Models/SuperAdmin/superAdminModel');

const { generateToken, generaterefreshToken } = require('../../HelperFunctions/jwt_token_generation');


const login = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    const sAdmin = await Super_Admin.findOne({ email: email });
    if(sAdmin === null || sAdmin === undefined){
        return res.status(400).json({
            message: 'Super Admin not found or Entered incorrect credentials!'
        });
    }

    if(sAdmin && (await bcrypt.compare(password, sAdmin.password))){
        var token = generateToken(sAdmin.id);
        var refresh_token = generaterefreshToken(sAdmin.id);

        await Super_Admin.findByIdAndUpdate(sAdmin.id, {
            token: token,
            refresh_token: refresh_token
        });

        return res.status(200).json({
            message: 'Login Successfull.',
            token: token,
            refresh_token: refresh_token
        });
    }
    
});


module.exports = { login }