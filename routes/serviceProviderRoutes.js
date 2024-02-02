// routes/serviceProviderRoutes.js
const express = require('express');
const router = express.Router();
const { signupServiceProvider } = require('../controllers/serviceProviderController');

// Define route for service provider signup
router.post('/signup', signupServiceProvider);

module.exports = router;
