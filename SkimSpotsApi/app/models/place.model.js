module.exports = (sequelize, Sequelize) => {
    const Place = sequelize.define("place", {
        name: {
            type: Sequelize.STRING
        },
        welcomeText: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        points: {
            type: Sequelize.INT
        }
    });

    return Place;
};