module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();

    // Create a new User
    router.post("/", user.create);

    //Retrieve all Users
    router.get("/", user.getAll);

    // Retrieve last User
    router.get("/last",  user.getLastUser);

    // Retrieve User with id
    router.get("/:id",  user.getUserByID);

    // Update a User with id
    router.put("/:id", user.update);

    // Delete a User with id
    router.delete("/:id", user.delete);

    app.use('/api/user', router);
};