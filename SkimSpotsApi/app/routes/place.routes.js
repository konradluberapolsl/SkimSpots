module.exports = app => {
    const place = require("../controllers/place.controller.js");
    var router = require("express").Router();

    // Create a new place
    router.post("/", place.create);

    //Retrieve all places
    router.get("/", place.getAll);

    // Retrieve place titles
    router.get("/alltitles", place.getPlaceAllTitles);

    // Retrieve place with id
    router.get("/:id",  place.getPlaceByID);

    // Retrieve place with title
    router.get("/title/:title",  place.getPlaceByTitle);

    // Update a place with id
    router.put("/:id", place.update);

    // Delete a place with id
    router.delete("/:id", place.delete);

    app.use('/api/place', router);
};