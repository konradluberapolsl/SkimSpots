module.exports = (sequelize, Sequelize) => {
    const premiumPlace = sequelize.define("premium_place", {
        date: {
            type: Sequelize.DATE,
        },
        premiumPoints: {
            type: Sequelize.INTEGER,
        },
    });

    return premiumPlace;
};