const express = require('express');
const router = express.Router();

const {
    fetchSecondaryAgents
} = require('../../Controllers/agentsControllers/secondaryAgentsController');


router.get('/fetchlist/:id', fetchSecondaryAgents);

module.exports = router