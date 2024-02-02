'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('serviceRequestors', 'mob', {
      type: Sequelize.STRING, // Assuming the mobile number is a string
      allowNull:false,
    });
    await queryInterface.addColumn('serviceProviders', 'mob', {
      type: Sequelize.STRING, // Assuming the mobile number is a string
      allowNull:false,
    });
    await queryInterface.addColumn('ServiceRequests', 'requesterId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('ServiceProviders', 'isProvider', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
    await queryInterface.addColumn('ServiceRequests', 'providerId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    // Add foreign key constraints
    await queryInterface.addConstraint('ServiceRequests', {
      fields: ['requesterId'],
      type: 'foreign key',
      name: 'fk_service_requests_requester_id',
      references: {
        table: 'ServiceRequestsors',
        field: 'id',
      },
      onDelete: 'CASCADE', // Set the desired onDelete behavior
      onUpdate: 'CASCADE', // Set the desired onUpdate behavior
    });

    await queryInterface.addConstraint('ServiceRequests', {
      fields: ['providerId'],
      type: 'foreign key',
      name: 'fk_service_requests_provider_id',
      references: {
        table: 'ServiceProviders',
        field: 'id',
      },
      onDelete: 'CASCADE', // Set the desired onDelete behavior
      onUpdate: 'CASCADE', // Set the desired onUpdate behavior
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove columns
    await queryInterface.removeColumn('ServiceRequests', 'requesterId');
    await queryInterface.removeColumn('ServiceRequests', 'providerId');

    // Remove foreign key constraints
    await queryInterface.removeConstraint('ServiceRequests', 'fk_service_requests_requester_id');
    await queryInterface.removeConstraint('ServiceRequests', 'fk_service_requests_provider_id');
/**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
