const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');
const nodemailer = require('nodemailer');

const generateRandomPassword = require('../../HelperFunctions/generateRandomPassword');
const Company_Auth = require('../../Models/CompaniesManagement/companyAuthModel');

const createNewCompany = asyncHandler(async (req,res) => {
    const { name, email } = req.body;

    if(!name || !email){
        return res.status(400).json({
            message: 'Enter name/email'
        });
    }else{
        const company = await Company_Auth.findOne({ company_email: email});

        if(company) return res.status(400).json({message: 'Email already exists.'})
        else{
            const createCompany = await Company_Auth.create({
                company_name: name,
                company_email: email,
                password: generateRandomPassword()
            });
            return res.status(201).json({
                message: 'Company created successfully.',
                result: createCompany
            })
        }
    }
});

const sendInvite = asyncHandler(async (req,res) => {
    const { email } = req.body;
    const company = await Company_Auth.findOne({
        company_email: email
    });
    if(company){

        const testAccount = await nodemailer.createTestAccount();
    
        //console.log(testAccount);
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    
        const mailOptions = {
            from: 'eche18054@rgipt.ac.in',
            to: email,
            subject: 'Invite to login',
            html: `<p>Dear ${company.company_name},</p>
            <p>Please use the following credentials to login:</p>
            <p>Email: ${email}</p>
            <p>Password: ${company.password}</p>
            <a href="https://example.com/login">Login now</a>`
        }

        transporter.sendMail(mailOptions, (err,info) => {
            if(err) {
                console.log(err);
                return res.status(500).json({message: 'Error in sending email'})
            }
            else{
                console.log(info.response);
                return res.status(200).json({
                    message: 'Email sent successfully'
                })
            }
        })
    }else{
        return res.status(400).json({message: 'Email not exists, create one!'})
    }
})

module.exports = { createNewCompany, sendInvite }