const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');
const mongoose = require('mongoose');

const PrimaryAgents = require('../../Models/Agents/primaryAgentModel');
const SecondaryAgents = require('../../Models/Agents/secondaryAgentModel');

// -------------------* FETCH SECONDARY AGENTS *------------------------------------

const fetchSecondaryAgents = asyncHandler(async(req,res) => {
    const secondaryAgents = await SecondaryAgents.find({
        primary_agent: req.params.id
    });
    logger.info('Secondary Agents fetched')
    res.status(200).json({
        message: 'Secondary Agents fetched.',
        result: secondaryAgents
    });
});

// ---------------------------------------------------------------------------------

module.exports = { fetchSecondaryAgents }