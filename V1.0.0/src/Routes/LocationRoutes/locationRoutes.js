const express = require('express');
const router = express.Router();

const { fetchLocationTree, fetchCommunities, addDescToCommunities, fetchCommunitiesDesc } = require('../../Controllers/locationControllers/location_tree');

router.get('/locationtree', fetchLocationTree);
router.get('/communities', fetchCommunities);
router.get('/fetch-communitiesdesc', fetchCommunitiesDesc);

router.post('/add-desc-to-community', addDescToCommunities);

module.exports = router;