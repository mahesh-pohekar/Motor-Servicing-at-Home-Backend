// routes/serviceRequestorRoutes.js
const express = require('express');
const router = express.Router();
const { signupServiceRequestor } = require('../controllers/serviceRequestorController');

// Define route for service requestor signup
router.post('/signup', signupServiceRequestor);
// Get all service requests with related information

module.exports = router;
