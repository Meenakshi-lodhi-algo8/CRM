const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');
const mongoose = require('mongoose');

const PrimaryAgents = require('../../Models/Agents/primaryAgentModel');
const SecondaryAgents = require('../../Models/Agents/secondaryAgentModel');
// -------------------* FETCH PRIMARY AGENTS *--------------------------------------

const fetchPrimaryAgents = asyncHandler(async(req,res) => {
    const primaryAgents = await PrimaryAgents.find();
    
    res.status(200).json({
        message: 'Primary Agents fetched.',
        result: primaryAgents
    });
});

// ---------------------------------------------------------------------------------

module.exports = { fetchPrimaryAgents }