/*     
       --------------------------------------------------------------
       mongo collection for users profile
       --------------------------------------------------------------
*/

const mongoose = require('mongoose');
const userProfileSchema = mongoose.Schema({
    user_auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Auth'
    },
    profile_pic: { type: String },
    first_name: { type: String, required: true }, 
    last_name: { type: String },
    email: { type: String, required: true },
    phone_number: { type: String },
    dob: { type: String },
    bnr_number: { type: String },
    //role: { type: String },
    bio: { type: String },
    address: { type: String },
    facebook_url: { type: String },
    twitter_url: { type: String },
    instagram_url: { type: String },
    document: { type: String }
});

module.exports = mongoose.model('UserProfiles', userProfileSchema);