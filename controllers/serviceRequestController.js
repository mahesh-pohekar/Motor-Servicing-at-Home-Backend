// controllers/serviceRequestController.js
const ServiceRequest = require('../models/ServiceRequest');
const ServiceRequestor = require('../models/ServiceRequestor');
const ServiceProvider = require('../models/ServiceProvider');
const sequelize = require('sequelize');

const createServiceRequest = async (req, res) => {
  try {
    const { id,type, date, time, comments } = req.body;

    const userId = id; 

    // Find the requester's location
    const requester = await ServiceRequestor.findByPk(userId);
    if (!requester) {
      return res.status(400).json({ error: 'User not found.' });
    }
    const requesterLocation = {
      latitude: requester.dataValues.location.coordinates[0],
      longitude: requester.dataValues.location.coordinates[1]
    };
  
    console.log("after getting lat and long",requesterLocation.latitude,requesterLocation.longitude);
    // Find the nearest service provider (this is a placeholder, actual logic may vary)
    const reqLatitude=requesterLocation.latitude;
    const reqLongitude=requesterLocation.longitude;
    const findNearestProvider = async (userLatitude, userLongitude) => {
      try {
        // Haversine formula to calculate distance
        const haversine = (lat1, lon1, lat2, lon2) => {
          const R = 6371; // Earth radius in kilometers
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c; // Distance in kilometers
          return distance;
        };
    
        // Find all service providers with their locations
        const allProviders = await ServiceProvider.findAll({ attributes: ['id', 'location'] });
    
        // Calculate distances and find the nearest provider
        let nearestProvider = null;
        let minDistance = Infinity;
    
        allProviders.forEach((provider) => {
          const distance = haversine(userLatitude, userLongitude, provider.dataValues.location.coordinates[0], provider.dataValues.location.coordinates[1]);
          if (distance < minDistance) {
            minDistance = distance;
            nearestProvider = provider;
          }
        });
    
        return nearestProvider;
      } catch (error) {
        console.error('Error finding nearest service provider:', error);
        throw error;
      }
    };
    
    let nearestProvider;
    try {
      nearestProvider = await findNearestProvider(reqLatitude, reqLongitude);
    } catch (error) {
      console.error('Error:', error);
    }

    if (!nearestProvider) {
      return res.status(400).json({ error: 'No available service providers.' });
    }

    const providerId = nearestProvider.id;
    const requesterId=userId;
    const newRequest = await ServiceRequest.create({
      type,
      date,
      time,
      comments,
      requesterId,
      providerId,
      
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Inside serviceRequestController Error creating service request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createServiceRequest };
