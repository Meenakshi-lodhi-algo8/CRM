const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');
const mongoose = require('mongoose');

const CompanyProfiles = require('../../Models/CompaniesManagement/companiesProfileModel');
const Company_Auth = require('../../Models/CompaniesManagement/companyAuthModel');

const { performMongoOperation } = require('../../Setup/configDB');
const { generateToken, generaterefreshToken } = require('../../HelperFunctions/jwt_token_generation');

const registerCompany = asyncHandler(async(req,res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        res.status(400).json({
            message: 'Something Invalid or not found.'
        });
        logger.error('Enter valid details.')
    }else{

        const existedCompany = await Company_Auth.findOne({ company_email:email });
        if(existedCompany){
            logger.warn('Company already exists. Please login');
            res.status(400).json({
                message: 'Company already exists'
            });
        }else{

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
        
            const company = await Company_Auth.create({ 
                company_name: name,
                company_email: email,
                password: hashedPassword
            });
            console.log(company.id);
        
            if(company){
                var token = generateToken(company.id);
                var refresh_token = generaterefreshToken(company.id);

                const addToken = await Company_Auth.findByIdAndUpdate(company.id, {
                    token: token,
                    refresh_token: refresh_token
                });

                // making new db for the company
                const dbName = name.replace(' ', '_');
                console.log(dbName);
                //const conn = await mongoose.createConnection(process.env.MONGO_URI+dbName);
                //console.log(conn.connection.host);        
                logger.info('Company registered successfully');
        
                res.status(201).json({
                    message: 'Company registered successfully',
                    result: company,
                    token: token,
                    refresh_token: refresh_token
                });
            }
        }
    
    }

});

const login = asyncHandler(async(req,res) => {
    const { email, password } = req.body;
    const company = await Company_Auth.findOne({company_email: email});

    if(company && (password === company.password)){
        var token = generateToken(company.id);
        var refresh_token = generaterefreshToken(company.id);

        await Company_Auth.findByIdAndUpdate(company.id, {
            token: token,
            refresh_token: refresh_token
        });

        return res.status(200).json({
            message: 'Company Login Successful....',
            id: company.id,
            name: company.company_name,
            token: token,
            refresh_token: refresh_token
        });
    }
    else{
        return res.status(400).json({message: 'Company does not exist in DB.'})
    }
});

const addCompanyDetails = asyncHandler(async (req,res) => {

    const id = req.params.companyid
    const {
        company_logo,
        company_name,
        trading_name,
        company_email,
        company_mobile_no,
        company_whatsapp_no,
        fax_no,
        website_url,
        address1,
        address2,
        city,
        state,
        country,
        zip_code,
        company_info,
        facebook_url,
        instagram_url,
        youtube_url,
        linkedin_url,
        pinterest_url,
        vimeo_url,
        watermark
    } = req.body;

    if(!company_email || !company_name || !company_mobile_no ){
        return res.status(400).json('Fill all mandatory fields.')
    }
    const company = await Company_Auth.findById(id);
    if(company === null || company === undefined){
        return res.status(400).json({message: 'Company not exists in DB'});
    }else{
        const companyProfile = await CompanyProfiles.findOne({
            company_auth: id
        });
        if(companyProfile){
            const updateProfile = await CompanyProfiles.findOneAndUpdate({company_auth: id}, req.body);

            return res.status(200).json({
                message: 'Profile updated.',
                result: updateProfile
            });
        }else{
            req.body.company_auth = company.id
            const createProfile = await CompanyProfiles.create(req.body);

            return res.status(201).json({
                message: 'Profile added successfully.',
                result: createProfile
            });
        }
    }
});

module.exports = { registerCompany, login, addCompanyDetails }