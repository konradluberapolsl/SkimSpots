module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        points: {
            type: Sequelize.TEXT
        }
    });

    return Comment;
};