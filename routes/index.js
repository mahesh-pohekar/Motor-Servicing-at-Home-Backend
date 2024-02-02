const express = require('express');
const router = express.Router();
const serviceRequestRoutes = require('./serviceRequestRoutes');

// Define routes
router.use('/api/service-requests', serviceRequestRoutes);

module.exports = router;
