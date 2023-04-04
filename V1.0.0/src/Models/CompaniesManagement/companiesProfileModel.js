/*     
       --------------------------------------------------------------
       mongo collection for companies profile
       --------------------------------------------------------------
*/

const mongoose = require('mongoose');
const companyProfileSchema = mongoose.Schema({
    company_auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company_Auth'
    },
    company_logo: { type: String },
    company_name: { type: String },
    trading_name: { type: String },
    company_email: { type: String },
    company_mobile_no: { type: String },
    company_whatsapp_no: { type: String },
    fax_no: { type: String },
    website_url: { type: String },
    address_1: { type: String },
    address_2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zip_code: { type: String },
    company_info: { type: String },
    facebook_url: { type: String },
    instagram_url: { type: String },
    youtube_url: { type: String },
    linkedin_url: { type: String },
    pinterest_url: { type: String },
    vimeo_url: { type: String },
    watermark:{ type: String }
});

module.exports = mongoose.model('CompanyProfiles', companyProfileSchema);




