const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const Company_Auth = require('../../Models/CompaniesManagement/companyAuthModel');
const User_Auth = require('../../Models/CompaniesManagement/userAuthModel');
const UserProfiles = require('../../Models/CompaniesManagement/userProfileModel');

const generateRandomPassword = require('../../HelperFunctions/generateRandomPassword');
const { generateToken, generaterefreshToken } = require('../../HelperFunctions/jwt_token_generation');

const addNewUser = asyncHandler(async (req,res) => {
    const id = req.params.companyid;
    const {
        first_name, last_name, profile_pic,
        email, phone_number, document,
        dob, bnr_number, bio, address,
        facebook_url, twitter_url, instagram_url
    } = req.body;

    if (!first_name || !email ){
        return res.status(400).json({
            message: 'Enter first name or email'
        })
    }

    const user = await User_Auth.findOne({user_email: email});
    if(user === null || user === undefined){
        const createNewUser = await User_Auth.create({
            company: id,
            user_name: `${first_name} ${last_name}`,
            user_email: email,
            password: generateRandomPassword()
        });

        // TODO: send invite to with login credentials to given email.
        var message = {
            to: email,
            from: "eche18054@rgipt.ac.in",
            subject: "CRM Login credentials.",
            html: `<p>Hii ${createNewUser.user_name}, Here are your login credentials for login to CRM pixl.</p><p>email: ${email}, password: ${createNewUser.password}</p>`
        }

        sgMail.send(message).then((d) => {
            console.log('Email sent successfully', d);
        }).catch((err) => {
            console.log(err);
        })

        const profile = await UserProfiles.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            dob: dob,
            bnr_number: bnr_number,
            profile_pic: profile_pic,
            user_auth: createNewUser.id,
            bio: bio,
            address: address,
            facebook_url: facebook_url,
            twitter_url: twitter_url,
            instagram_url: instagram_url,
            document: document
        });

        return res.status(201).json({
            message: 'User created successfully and invite sent.',
            result: {
                user: createNewUser,
                profile: profile
            }
        });

    }else{
        return res.status(400).json({
            message: 'User you want to add already exists.'
        });
    }
});

const editUserProfile = asyncHandler(async(req,res) => {
    const id = req.params.companyid;
    const userid = req.params.userid;

    const profile = await UserProfiles.findOne({user_auth: userid});
    if(profile === null || profile === undefined){
        return res.status(400).json({
            message: 'User not found.'
        });
    }else{
        const updatedProfile = await UserProfiles.findOneAndUpdate({user_auth: userid}, req.body);
        return res.status(200).json({
            message: 'Profile updated.',
            result: updatedProfile
        });
    }
});

const deleteUser = asyncHandler(async(req,res) => {
    const id = req.params.companyid;
    const userid = req.params.userid;

    const user = await User_Auth.findById(userid);
    if(user){
        await User_Auth.deleteOne({id: userid});
        await UserProfiles.deleteOne({ user_auth: userid });

        return res.status(200).json({
            message: 'User deleted successfully.'
        })
    }else{
        return res.status(400).json({
            message: 'User not found.'
        })
    }
})

const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;

    const user = await User_Auth.findOne({ email: email });
    if(user === null || user === undefined){
        return res.status(400).json({
            message: 'Email not found.'
        });
    }else{
        const token = generateToken();
        const refresh_token = generaterefreshToken();
        const updateUser = await User_Auth.findOneAndUpdate({email: email}, {
            token: token,
            refresh_token: refresh_token
        });

        return res.status(200).json({
            message: 'User logged in successfully.',
            token: token,
            refresh_token: refresh_token
        });
    }
});

const getUsersByCompany = asyncHandler(async(req,res) => {
    const id = req.params.companyid;
    const users = await User_Auth.find({company: id});
    var list = [];
    for(var user of users){
        const profile = await UserProfiles.findOne({user_auth: user.id});
        //console.log(profile);
        list.push(profile);
    }
    res.status(200).json({
        message: 'Users List fetched.',
        result: list
    })
});

module.exports = { addNewUser, loginUser, getUsersByCompany, editUserProfile, deleteUser }
