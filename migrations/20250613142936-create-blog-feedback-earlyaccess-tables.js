'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Blog table
    await queryInterface.createTable('blogs', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      title: {type: Sequelize.STRING(255), allowNull: false},
      content: {type: Sequelize.TEXT, allowNull: false},
      category: {type: Sequelize.STRING(100), allowNull: true},
      view_count: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
      created_by_name: {type: Sequelize.STRING(100), allowNull: true},
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Feedback table
    await queryInterface.createTable('feedbacks', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      name: {type: Sequelize.STRING(100), allowNull: false},
      phone: {type: Sequelize.STRING(20), allowNull: true},
      email: {type: Sequelize.STRING(100), allowNull: false},
      message: {type: Sequelize.TEXT, allowNull: false},
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // EarlyAccess table
    await queryInterface.createTable('early_accesses', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      email: {type: Sequelize.STRING(100), allowNull: false, unique: true},
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('early_accesses');
    await queryInterface.dropTable('feedbacks');
    await queryInterface.dropTable('blogs');
  },
};
