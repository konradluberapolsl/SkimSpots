module.exports = app => {
    const userPlace = require("../controllers/userPlace.controller.js");
    var router = require("express").Router();

    // Create a new user place
    router.post("/", userPlace.create);

    //Retrieve all user places
    router.get("/", userPlace.getAll);

    // Retrieve user place by user id
    router.get("/place/:id", userPlace.getByUserID);

    // Retrieve user place by place id
    router.get("/:id",  userPlace.getByPlaceID);

    // Update a user place with id
    router.put("/:id", userPlace.update);

    // Delete a user place with id
    router.delete("/:id", userPlace.delete);

    app.use('/api/userPlace', router);
};