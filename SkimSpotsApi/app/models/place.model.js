module.exports = (sequelize, Sequelize) => {
    const Place = sequelize.define("place", {
        name: {
            type: Sequelize.STRING
        },
        welcomeText: {
            type: Sequelize.STRING
        },
        estimatedLocalization:{
          type: Sequelize.STRING
        },
        information: {
            type: Sequelize.TEXT
        },
        points: {
            type: Sequelize.INTEGER
        },
        pathToImages:{
            type: Sequelize.STRING
        },
        numberOfImages:{
            type: Sequelize.INTEGER
        }
    });

    return Place;
};