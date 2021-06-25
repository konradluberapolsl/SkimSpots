const db = require("../models");
const PremiumPlaces = db.premiumPlaces;

exports.create = (req, res) => {
    const premiumPlace = {
        date: req.body.date,
        placeId: req.body.placeId,
        premiumPoints: req.body.premiumPoints,
    };

    PremiumPlaces.create(premiumPlace)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the UserPlace.",
            });
        });
};

exports.getAll = (req, res) => {
    PremiumPlaces.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserPlaces.",
            });
        });
};