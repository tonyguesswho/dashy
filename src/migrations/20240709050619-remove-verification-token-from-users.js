module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'verificationToken');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'verificationToken', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
