module.exports = (sequelize, Sequelize) => {
    const UserPoints = sequelize.define("user_points", {
        amount: {
            type: Sequelize.INTEGER
        }
    });

    return UserPoints;
};