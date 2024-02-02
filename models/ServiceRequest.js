// models/ServiceRequest.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ServiceRequestors = require('./ServiceRequestor');
const ServiceProviders = require('./ServiceProvider');

const ServiceRequest = sequelize.define('ServiceRequests', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
  },
  requesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ServiceRequestors,
      key: 'id',
    },
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ServiceProviders,
      key: 'id',
    },
  },
});

ServiceRequest.belongsTo(ServiceRequestors, { as: 'requestor', foreignKey: 'requesterId' });
ServiceRequest.belongsTo(ServiceProviders, { as: 'provider', foreignKey: 'providerId' });

module.exports = ServiceRequest;
