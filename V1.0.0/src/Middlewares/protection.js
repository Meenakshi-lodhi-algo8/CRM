
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');
const logger = require('../Logger/dev-logger');

const Company_Auth = require('../Models/CompaniesManagement/companyAuthModel');

var secret = '0242ac120002'

// middleware for checking whether super admin is logged in or not..
exports.protect_Company = asyncHandler(async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secret);
            //console.log(req.params.id);
            req.user = await Company_Auth.findById(decoded.id).select('-password');
            logger.info('Company routes protected');
            next();
        }catch (error){
            logger.error('Company not authorized', error);
            res.status(401);
            throw new Error('Not Authorized');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized along with the token');
        logger.error('super admin not authorized and token also not available');
    }
});

exports.protect_User = asyncHandler(async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secret);
            //console.log(req.params.id);
            req.user = await User_Auth.findById(decoded.id).select('-password');
            logger.info('User routes protected');
            next();
        }catch (error){
            logger.error('User not authorized', error);
            res.status(401);
            throw new Error('Not Authorized');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized along with the token');
        logger.error('super admin not authorized and token also not available');
    }
});