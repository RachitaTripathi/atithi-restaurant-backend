const express = require("express");
const table = require("../routes/table");
const error = require("../middleware/error");

module.exports = function (app) {
	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Origin,X-Requested-With, Content-Type, Accept, x-auth-token"
		);
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, PATCH, OPTIONS"
		);
		next();
	});
	app.use(express.json({ limit: "50mb" }));
	app.use("/api/table", table);
	app.use(error);
};
