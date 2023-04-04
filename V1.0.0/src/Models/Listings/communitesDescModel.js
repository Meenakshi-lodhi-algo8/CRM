/*     
       --------------------------------------------------------------
       mongo collection for communities description.
       --------------------------------------------------------------
*/

const mongoose = require('mongoose');
const communitiesDescription = mongoose.Schema({
    //    company: {
    //           type: mongoose.Schema.Types.ObjectId,
    //           ref: 'Company_Auth'
    //    },
       community: { type: String, required: true },
       description: { type: String }
});

module.exports = mongoose.model('Communities_Desc', communitiesDescription);