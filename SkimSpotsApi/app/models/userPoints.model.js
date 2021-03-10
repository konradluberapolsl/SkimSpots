module.exports = (sequelize, Sequelize) => {
    const UserPoints = sequelize.define("user_points", {
        amount: {
            type: Sequelize.INT
        }
    });

    return UserPoints;
};