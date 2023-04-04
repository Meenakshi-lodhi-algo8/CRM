/*     
       --------------------------------------------------------------
       mongo collection for saving all secondary agents
       --------------------------------------------------------------
*/

const mongoose = require('mongoose');
const secondaryAgentSchema = mongoose.Schema({
    name: { type: String },
    primary_agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrimaryAgents'
    }
});

module.exports = mongoose.model('SecondaryAgents', secondaryAgentSchema);