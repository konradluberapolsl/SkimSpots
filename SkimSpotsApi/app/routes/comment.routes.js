module.exports = app => {
    const comment = require("../controllers/comment.controller.js");
    var router = require("express").Router();

    // Create a new Comment
    router.post("/", comment.create);

    //Retrieve all Comments
    router.get("/", comment.getAll);

    // Retrieve Place comments
    router.get("/place/:id", comment.getPlaceComments);

    // Retrieve Comment with id
    router.get("/:id",  comment.getCommentByID);

    // Retrieve User Comments
    router.get("user/:id",  comment.getUserComments);

    // Update a Comment with id
    router.put("/:id", comment.update);

    // Delete a Comment with id
    router.delete("/:id", comment.delete);

    app.use('/api/comment', router);
};