const mongoose = require('mongoose');


const superAdminSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    refresh_token: { type: String } 
});

module.exports = mongoose.model('Super_Admin', superAdminSchema);;