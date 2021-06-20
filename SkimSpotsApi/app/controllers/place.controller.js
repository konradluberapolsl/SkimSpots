const db = require("../models");
const Place = db.places;
const Op = db.Sequelize.Op;
const User = db.user;

exports.create = (req, res) => {

    // if ((!req.body.name) || (!req.body.information)) {
    //     res.status(400).send({
    //         message: "name can not be empty."
    //     });
    //     return;
    // }

    const place = {
        name: req.body.name,
        welcomeText: req.body.welcomeText,
        information: req.body.information,
        pathToImages: req.body.pathToImages,
        authorId: req.body.authorId,
        points: req.body.points,
    }

    Place.create(place)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Place."
            });
        });
};

exports.getAll = (req, res) => {
    const name = req.query.name;

    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;

    Place.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Places."
            });
        });
};

exports.getPlaceByID = (req, res) => {
    var placeID = req.params.id;

    Place.findByPk(placeID)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Place."
            });
        });
};

exports.getPlaceAllNames = (req, res) => {

    Place.findAll({ attributes: ['name'], raw: true })
        .then(data => {
            res.send(data.map(place => place.name)); // Return only values
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Place names."
            });
        });
};

exports.getPlaceByName = (req, res) => {
    var name = req.params.name;

    Place.findOne({ where: { name: name }, include: [{model: User, as: "author"}], })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Places."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Place.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Place was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Place with id=${id}. Maybe Place was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Place with id=" + id
            });
        });

};

exports.delete = (req, res) => {
    const id = req.params.id;

    Place.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Place was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Place with id=${id}. Maybe Place was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Place with id= " + id
            });
        });
};