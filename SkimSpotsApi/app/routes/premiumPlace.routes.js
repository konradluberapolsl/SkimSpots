module.exports = (app) => {
    const place = require("../controllers/premiumPlace.controller.js");
    var router = require("express").Router();

    // Create a new place
    router.post("/", place.create);

    //Retrieve all places
    router.get("/", place.getAll);

    //Retrieve current premium places
    router.get("/today", place.getCurrentPremiumPlaces);

    app.use("/api/premiumPlace", router);
};