const express = require('express');
const router = express.Router();
const { createServiceRequest } = require('../controllers/serviceRequestController');
const ServiceRequest = require('../models/ServiceRequest');
const ServiceRequestor = require('../models/ServiceRequestor');
  // Endpoint for creating a service request
  router.post('/create', createServiceRequest);
// Export the router to be used in other parts of the application
router.get('/', async (req, res) => {
  try {
    const providerId = req.query.providerId; // Get providerId from query parameter
    if (!providerId) {
      return res.status(400).json({ error: 'Provider ID is required.' });
    }

    const serviceRequests = await ServiceRequest.findAll({
      where: { providerId }, // Filter service requests by providerId
      include: {
        model: ServiceRequestor,
        as: 'requestor',
        attributes: ['name', 'mob', 'email', 'location'],
      },
      attributes: ['id', 'type', 'date', 'time', 'comments', 'requesterId', 'providerId', 'createdAt', 'updatedAt'],
    });

    res.json(serviceRequests);
  } catch (error) {
    console.error('Error fetching service requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
