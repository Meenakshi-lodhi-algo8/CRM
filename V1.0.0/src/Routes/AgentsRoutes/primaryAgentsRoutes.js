const express = require('express');
const router = express.Router();

const {
    fetchPrimaryAgents
} = require('../../Controllers/agentsControllers/primaryAgentsController');


router.get('/fetchlist', fetchPrimaryAgents);

module.exports = router