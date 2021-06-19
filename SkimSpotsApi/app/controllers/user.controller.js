const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.name){
        res.status(400).send(
            {
                message: "Can not add empty user."
            });
        return;
    }

    const user = {
        name: req.body.name,
    }

    User.create(user)
        .then(data =>{
            exports.getLastUser(req, res)
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding User."
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

    User.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        });
};

exports.getUserByID = (req, res) => {
    var userID = req.params.id;

    User.findByPk(userID)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving User with id=" + id
            });
        });
};

exports.getLastUser = (req, res) => {
    User.findOne({
        order: [ [ 'createdAt', 'DESC' ]]
    }).then(data => {
        res.send(data)
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving last user"
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe Author was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });

};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe Author was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id= " + id
            });
        });
};