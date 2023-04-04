const express = require('express');
const router = express.Router();


const { login } = require('../../Controllers/superAdminControllers/superAdminLogin');

const { createNewCompany, sendInvite } = require('../../Controllers/superAdminControllers/createNewCompany');

router.post('/login', login);

router.post('/createcompany', createNewCompany);

router.post('/sendinvite', sendInvite);

module.exports = router