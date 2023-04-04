/*     
       --------------------------------------------------------------
       mongo collection for saving all primary agents
       --------------------------------------------------------------
*/

const mongoose = require('mongoose');
const primaryAgentSchema = mongoose.Schema({
    name: { type: String },
});

module.exports = mongoose.model('PrimaryAgents', primaryAgentSchema);