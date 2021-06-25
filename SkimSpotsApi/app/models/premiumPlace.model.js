module.exports = (sequelize, Sequelize) => {
    const premiumPlace = sequelize.define("premiumPlace", {
        date: {
            type: Sequelize.DATE,
        },
        premiumPoints: {
            type: Sequelize.INTEGER,
        },
    });

    return premiumPlace;
};