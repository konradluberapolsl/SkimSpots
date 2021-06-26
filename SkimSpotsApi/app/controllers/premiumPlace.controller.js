const db = require("../models");
const PremiumPlaces = db.premiumPlaces;
const Places = db.places;

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

exports.getCurrentPremiumPlaces = (req, res) => {
    PremiumPlaces.findAll()
        .then((data) => {
            if (data.length > 0) {
                const premiumPlacesDate = data[0].date.toISOString().slice(0, 10);
                const todayDate = new Date().toISOString().slice(0, 10);
                if (premiumPlacesDate === todayDate) {
                    res.send(data);
                } else {
                    // Clear all items in premium places table
                    PremiumPlaces.destroy({
                        truncate: true,
                    }).then(() => {
                        createNewPremiumPlaces().then((data) => {
                            res.send(data);
                        });
                    });
                }
            } else {
                createNewPremiumPlaces().then((data) => {
                    res.send(data);
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserPlaces.",
            });
        });
};

const createNewPremiumPlaces = () => {
    return new Promise((resolve) => {
        // Get all places
        Places.findAll().then((data) => {
            const allPlaces = data;
            // Get randomly 2 places
            const randomlySelectedPlaces = getRandomItemsFromArray(allPlaces, 2);
            const newPremiumPlaces = [];

            // Map selected random places and add it to new premium places array
            const premiumPoints = [30, 15];

            randomlySelectedPlaces.map((placeId, index) => {
                newPremiumPlaces.push({
                    date: new Date(),
                    premiumPoints: premiumPoints.length >= index + 1 ? premiumPoints[index] : 10,
                    placeId: placeId,
                });
            });

            // Add multiple(2) items to empty premium places table
            PremiumPlaces.bulkCreate(newPremiumPlaces).then((data) => {
                resolve(data);
            });
        });
    });
};

const getRandomItemsFromArray = (array, itemsCount) => {
    const arrayCopy = [...array];
    const arrayToReturn = [];
    for (let index = 0; index < itemsCount; index++) {
        const randomIndex = Math.floor(Math.random() * arrayCopy.length);
        const item = arrayCopy[randomIndex];
        arrayToReturn.push(item.id);
        arrayCopy.splice(randomIndex, 1);
    }
    return arrayToReturn;
};