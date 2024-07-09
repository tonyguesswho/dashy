module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'authProvider', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'local', // default to 'local' for existing users
    });

    await queryInterface.addColumn('Users', 'authProviderId', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Make the password field nullable
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'authProvider');
    await queryInterface.removeColumn('Users', 'authProviderId');

    // Revert password field to non-nullable
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
