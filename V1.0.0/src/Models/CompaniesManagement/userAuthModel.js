/*     
       --------------------------------------------------------------
       mongo collection for users auth
       --------------------------------------------------------------
*/

const mongoose = require('mongoose');
const userAuthSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company_Auth'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams'
    },
    team_leader: { type: Boolean, default: false },
    user_name: { type: String },
    user_email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    refresh_token: { type: String } 
});

module.exports = mongoose.model('User_Auth', userAuthSchema);