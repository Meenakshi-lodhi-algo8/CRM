/*     
       --------------------------------------------------------------
       mongo collection for Reference Sequencing Number of Company...
       --------------------------------------------------------------
*/

const mongoose = require('mongoose');
const referenceSequenceSchema = mongoose.Schema({
    reference_code: { type: String },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company_Auth'
    }
});

module.exports = mongoose.model('ReferenceSequence', referenceSequenceSchema);