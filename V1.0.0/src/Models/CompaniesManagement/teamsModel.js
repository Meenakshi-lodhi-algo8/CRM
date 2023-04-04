/*     
       --------------------------------------------------------------
       mongo collection for teams
       --------------------------------------------------------------
*/

const mongoose = require('mongoose');
const teamsSchema = mongoose.Schema({
       company: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Company_Auth'
       },
       team_name: { type: String, required: true },
       description: { type: String }
});

module.exports = mongoose.model('Teams', teamsSchema);