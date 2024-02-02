// models/ServiceProvider.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
const ServiceRequest = require('./ServiceRequest');

const ServiceProvider = sequelize.define('ServiceProviders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isProvider:{
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mob:{
    type: DataTypes.STRING, // Assuming the mobile number is a string
    allowNull:false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other fields as needed
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false,
  },
});

// Hash the password before saving it to the database
ServiceProvider.beforeCreate(async (serviceProvider) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(serviceProvider.password, saltRounds);
  ServiceProvider.password = hashedPassword;
});

// Method to compare passwords
ServiceProvider.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
module.exports = ServiceProvider;
