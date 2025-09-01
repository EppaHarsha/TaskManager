const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authcontroller')
router.post('/signup',authentication.signup);
router.post('/login',authentication.login);

module.exports=router;