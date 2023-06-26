const winston = require("winston");
const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(express.static(__dirname + "/uploads"));
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();
require("./startup/validation")();
app.use(helmet());

const port = 8080; //process.env.PORT || 5000;
const server = app.listen(port, () =>
	winston.info(`Listening on port ${port}...`)
);
module.exports = server;
