const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.places = require("./place.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.userPlaces = require("./userPlace.model")(sequelize, Sequelize);
db.userPoints = require("./userPoints.model")(sequelize, Sequelize);
db.premiumPlaces = require("./premiumPlace.model")(sequelize, Sequelize);

// TODO: Delete answers cascade
// add below to hasMany() -> (onDelete: 'cascade') ??
//db.user.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.user, { foreignKey: "userId", as: "user" });

db.places.hasMany(db.comments, { as: "comments", onDelete: "cascade" });
//db.comments.belongsTo(db.places, { foreignKey: "placeId", as: "place" });

//db.user.hasMany(db.places, { as: "places" });
db.places.belongsTo(db.user, { foreignKey: "authorId", as: "author" });

db.user.hasOne(db.userPoints, { as: "user" });
//db.userPoints.belongsTo(db.user, { foreignKey: "userId", as: "user" });
//
//db.user.hasMany(db.userPlaces, { as: "userplaces", onDelete: 'cascade' });
db.userPlaces.belongsTo(db.user, { foreignKey: "userId", as: "user" });
//
//db.places.hasMany(db.userPlaces, { as: "userplaces",  onDelete: 'cascade'  });
db.userPlaces.belongsTo(db.places, { foreignKey: "placeId", as: "place" });

db.premiumPlaces.belongsTo(db.places, { foreignKey: "placeId", as: "place" });

module.exports = db;