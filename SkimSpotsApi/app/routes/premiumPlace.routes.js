module.exports = (app) => {
    const place = require("../controllers/premiumPlace.controller.js");
    var router = require("express").Router();

    // Create a new place
    router.post("/", place.create);

    //Retrieve all places
    router.get("/", place.getAll);

    app.use("/api/premiumPlace", router);
};