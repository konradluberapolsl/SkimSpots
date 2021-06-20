const db = require("../models");
const UserPlace = db.userPlaces;
const Op = db.Sequelize.Op;
const Place = db.places;

exports.create = (req, res) => {

    // if ((!req.body.title) || (!req.body.information)) {
    //     res.status(400).send({
    //         message: "Title can not be empty."
    //     });
    //     return;
    // }

    const userPlace = {
        placeId: req.body.placeId,
        userId: req.body.userId
    }

    UserPlace.create(userPlace)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the UserPlace."
            });
        });
};

exports.getAll = (req, res) => {
    // const title = req.query.title;
    //
    // var condition = title ? {
    //     title: {
    //         [Op.like]: `%${title}%`
    //     }
    // } : null;

    UserPlace.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserPlaces."
            });
        });
};

exports.getUserPlaceByID = (req, res) => {
    var userPlaceID = req.params.id;

    UserPlace.findByPk(userPlaceID)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserPlace."
            });
        });
};

exports.getByPlaceID = (req, res) => {
    var placeID = req.params.id;

    UserPlace.findOne({ where: { placeId: placeID } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserPlaces."
            });
        });
};

exports.getByUserID = (req, res) => {
    var userID = req.params.id;

    UserPlace.findAll({ where: { userId: userID }, include: [{model: Place, as: "place"}] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserPlaces."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    UserPlace.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "UserPlace was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update UserPlace with id=${id}. Maybe UserPlace was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating UserPlace with id=" + id
            });
        });

};

exports.delete = (req, res) => {
    const id = req.params.id;

    UserPlace.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "UserPlace was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete UserPlace with id=${id}. Maybe UserPlace was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete UserPlace with id= " + id
            });
        });
};