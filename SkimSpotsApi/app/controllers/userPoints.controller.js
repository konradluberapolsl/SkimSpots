const db = require("../models");
const UserPoints = db.userPoints;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // if ((!req.body.title) || (!req.body.information)) {
    //     res.status(400).send({
    //         message: "Title can not be empty."
    //     });
    //     return;
    // }

    const userPoints = {
        userId: req.body.userId,
        amount: req.body.amount
    }

    UserPoints.create(userPoints)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the UserPoints."
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

    UserPoints.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserPointss."
            });
        });
};

exports.getUserPointsByID = (req, res) => {
    var userPointsID = req.params.id;

    UserPoints.findByPk(userPointsID)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserPoints."
            });
        });
};

exports.getByUserID = (req, res) => {
    var userID = req.params.id;

    UserPoints.findOne({ where: { userId: userID } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserPointss."
            });
        });
};

exports.updateByUserID = (req, res) => {
    const userID = req.params.id;

    UserPoints.update(req.body, {
        where: { userId: userID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "UserPoints was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update UserPoints with userId=${userID}. Maybe UserPoints was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating UserPoints with id=" + id
            });
        });

};

exports.update = (req, res) => {
    const id = req.params.id;

    UserPoints.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "UserPoints was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update UserPoints with id=${id}. Maybe UserPoints was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating UserPoints with id=" + id
            });
        });

};

exports.delete = (req, res) => {
    const id = req.params.id;

    UserPoints.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "UserPoints was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete UserPoints with id=${id}. Maybe UserPoints was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete UserPoints with id= " + id
            });
        });
};