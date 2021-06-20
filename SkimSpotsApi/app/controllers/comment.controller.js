const db = require("../models");
const Comment = db.comments;
const User = db.user;
const Op = db.Sequelize.Op;





exports.create = (req, res) => {

    if (!req.body.content) {
        res.status(400).send({
            message: "Comment can not be empty."
        });
        return;
    }

    const comment = {
        content: req.body.content,
        userId: req.body.userId,
        placeId: req.body.placeId,
    }

    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the comment."
            });
        });
};

exports.getAll = (req, res) => {
    const content = req.query.content;

    var condition = content ? {
        content: {
            [Op.like]: `%${content}%`
        },
        order: [ [ 'createdAt', 'DESC' ]]
    } : null;

    Comment.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Comments."
            });
        });
};

exports.getCommentByID = (req, res) => {
    var commentID = req.params.id;

    Comment.findByPk(commentID)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comment."
            });
        });
};

exports.getUserComments = (req, res) => {
    var userID = req.params.userId;

    Comment.findAll( {where: { userId: userID } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user comments."
            });
        });
};

exports.getPlaceComments = (req, res) => {
    var placeID = req.params.id;

    Comment.findAll( {where: { placeId: placeID }, include: [{model: User, as: "user"}],  order: [ [ 'createdAt', 'DESC' ]]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving place comments."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Comment with id=" + id
            });
        });

};

exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comment with id= " + id
            });
        });
};