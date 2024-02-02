// controllers/serviceProviderController.js
const ServiceProvider = require('../models/ServiceProvider');

// Controller to handle service provider signup
const signupServiceProvider = async (req, res) => {
  try {
    const { name, mob, email, password, latitude, longitude } = req.body;
    const newServiceProvider = await ServiceProvider.create({ name,mob, email, password, location: { type: 'Point', coordinates: [longitude, latitude] } });
    res.status(201).json(newServiceProvider);
  } catch (error) {
    console.error('Error during service provider signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signupServiceProvider };
