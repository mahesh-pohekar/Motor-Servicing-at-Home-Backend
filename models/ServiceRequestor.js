const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
const ServiceRequest = require('./ServiceRequest');


const ServiceRequestor = sequelize.define('ServiceRequestors', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
ServiceRequestor.beforeCreate(async (serviceRequestor) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(serviceRequestor.password, saltRounds);
    serviceRequestor.password = hashedPassword;
  });
  
  // Method to compare passwords
  ServiceRequestor.prototype.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

module.exports = ServiceRequestor;
