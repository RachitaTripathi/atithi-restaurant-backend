const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { SettlementMode, validate } = require("../models/settlementMode");
const express = require("express");
const { models } = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	let settlementMode = new SettlementMode({
		name: req.body.name,
	});
	settlementMode = await settlementMode.save();
	res.send(settlementMode);
});

router.put("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	const settlementMode = await SettlementMode.findByIdAndUpdate(
		req.body._id,
		{
			name: req.body.name,
		},
		{ new: true }
	);
	if (!settlementMode) return res.status(404).send("The SettlementMode was not found.");
	res.send(settlementMode);
});

router.delete("/", async (req, res) => {
	// const role = await Role.findOne({permissions: req.body._id});
	// if (role) return res.status(404).send('The Role with this Permission Exists. Cannot Delete');
	const settlementMode = await SettlementMode.findByIdAndRemove(req.body._id);
	if (!settlementMode) return res.status(404).send("The SettlementMode was not found.");
	res.send(settlementMode);
});

router.get("/all", async (req, res) => {
	const modes = await SettlementMode.find().sort({ _id: 1 });
	res.send(models);
});

router.get("/:nm", async (req, res) => {
	const settlementMode = await SettlementMode.find({ _id: req.params.nm });
	if (!settlementMode) return res.status(404).send("The settlementMode was not found.");
	res.send(settlementMode);
});

module.exports = router;
