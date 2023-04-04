/*     
       --------------------------------------------------------------
       mongo collection for companies profile
       --------------------------------------------------------------
*/

const mongoose = require('mongoose');
const companyAuthSchema = mongoose.Schema({
    company_name: { type: String },
    company_email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    refresh_token: { type: String } 
});

module.exports = mongoose.model('Company_Auth', companyAuthSchema);