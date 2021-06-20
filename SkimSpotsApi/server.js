const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// TODO: read about cors
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/img', express.static('../Places/'));

// call sysc()
const db = require("./app/models");

// sync all models with db -> auto generate tables
db.sequelize.sync();
//db.sequelize.sync({force: true});


// user routes
require("./app/routes/user.routes.js")(app);

// place routes
require("./app/routes/place.routes.js")(app);

// comment routes
require("./app/routes/comment.routes.js")(app);

// user points routes
require("./app/routes/userPoints.routes.js")(app);

// user places routes
require("./app/routes/userPlace.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// const {exec} = require('child_process');
//
// new Promise((resolve, reject) => {
//     const migrate = exec(
//         'cd app; npx sequelize-cli db:seed:all;' ,
//         {env: process.env},
//         err => (err ? reject(err): resolve())
//     );
//
//     // Forward stdout+stderr to this process
//     migrate.stdout.pipe(process.stdout);
//     migrate.stderr.pipe(process.stderr);
// });