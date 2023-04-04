const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');
const fs = require('fs');
const handlebars = require('handlebars');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const CompanyProfiles = require('../../Models/CompaniesManagement/companiesProfileModel');
const Company_Auth = require('../../Models/CompaniesManagement/companyAuthModel');
const Listings = require('../../Models/Listings/listingModel');
const User_Auth = require('../../Models/CompaniesManagement/userAuthModel');

const approveListing = asyncHandler(async(req,res) => {
    const id = req.body.listingId;
    const status = req.body.status;
    const listing = await Listings.findById(id);
    if(listing){
        if(status === "approved"){
            const user = await User_Auth.findById(listing.user);

            // const template = fs.readFileSync('D:/Algo8Projects/CRM/CRM-BE/public/emailBody/Approve.hbs','utf-8');
            
            // const compiledTemplate = handlebars.compile(template);
            // const data = {
            //     user: user.user_name,
            //     image: listing.images[0],
            //     title: listing.title,
            //     bedrooms: listing.bedrooms,
            //     bathrooms: listing.bathrooms,
            //     total_size: listing.total_size
            // }
            // const approveHtml = compiledTemplate(data);
            //console.log(approveHtml);
            const updateStatus = await Listings.findByIdAndUpdate(id, { approved: true });

            var message = {
                to: "raunakgarg05@gmail.com",
                from: "eche18054@rgipt.ac.in",
                subject: "Listing Status",
                html: '<p>Your listing has been approved by CRM Admin Team.</p>'
            }
            //console.log(approveHtml);
            sgMail.send(message).then((d) => {
                console.log('Email sent.',d);
            }).catch((err) => {
                console.log(err);
            });

            return res.status(200).json({
                message: 'Listing Approved Successfully.',
                result: updateStatus
            })
        }else{
            const updateStatus = await Listings.findByIdAndUpdate(id, {approved: false});

            var message = {
                to: user.user_email,
                from: "eche18054@rgipt.ac.in",
                subject: "Listing Status",
                html: '<p>Your Listing is Rejected.</p>'
            }
            sgMail.send(message).then(() => {
                console.log('Email sent.');
            }).catch((err) => {
                console.log(err);
            });

            return res.status(200).json({
                message: 'Listing rejected.',
                result: updateStatus
            });
        }
    }
});


module.exports = { approveListing }