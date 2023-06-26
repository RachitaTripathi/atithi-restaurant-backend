const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Table, validate } = require("../models/table");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	let table = new Table({
		tableno: req.body.tableno,
		status: req.body.status,
	});
	table = await table.save();
	res.send(table);
});

router.put("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	const table = await Table.findByIdAndUpdate(
		req.body._id,
		{
			tableno: req.body.tableno,
			status: req.body.status,
		},
		{ new: true }
	);
	if (!table) return res.status(404).send("The Table was not found.");
	res.send(table);
});

router.delete("/", async (req, res) => {
	// const role = await Role.findOne({permissions: req.body._id});
	// if (role) return res.status(404).send('The Role with this Permission Exists. Cannot Delete');
	const table = await Table.findByIdAndRemove(req.body._id);
	if (!table) return res.status(404).send("The Table was not found.");
	res.send(table);
});

router.get("/all", async (req, res) => {
	const tables = await Table.find().sort({ tableno: 1 });
	res.send(tables);
});

router.get("/:nm", async (req, res) => {
	const table = await Table.find({ tableno: req.params.nm });
	if (!table) return res.status(404).send("The table was not found.");
	res.send(table);
});

module.exports = router;
