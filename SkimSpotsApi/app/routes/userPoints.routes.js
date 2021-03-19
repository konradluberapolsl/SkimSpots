module.exports = app => {
    const userPoints = require("../controllers/userPoints.controller");
    var router = require("express").Router();

    // Create a new user place
    router.post("/", userPoints.create);

    //Retrieve all user places
    router.get("/", userPoints.getAll);

    // Retrieve user points by user id
    router.get("/place/:id", userPoints.getByUserID);

    // Update a user place with id
    router.put("/:id", userPoints.update);

    // Update a user place with user id
    router.put("/:id", userPoints.updateByUserID);

    // Delete a user points with id
    router.delete("/:id", userPoints.delete);

    app.use('/api/userPoints', router);
};