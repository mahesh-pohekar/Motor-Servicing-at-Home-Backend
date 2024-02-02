// controllers/serviceRequestorController.js
const ServiceRequestor = require('../models/ServiceRequestor');

// Controller to handle service requestor signup
const signupServiceRequestor = async (req, res) => {
  try {
    const { name,mob, email, password, latitude, longitude } = req.body;
    const newServiceRequestor = await ServiceRequestor.create({ name,mob, email, password, location: { type: 'Point', coordinates: [longitude, latitude] } });
    res.status(201).json(newServiceRequestor);
  } catch (error) {
    console.error('Error during service requestor signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signupServiceRequestor };
