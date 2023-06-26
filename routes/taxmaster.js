const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Taxmaster, validate } = require("../models/taxmaster");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	let taxmaster = new Taxmaster({
		outlet: req.body.outlet,
		taxname: req.body.taxname,
		appfrom: req.body.appfrom,
		appto: req.body.appto,
		rate: req.body.rate,
	});
	taxmaster = await taxmaster.save();
	res.send(taxmaster);
});

router.put("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	const taxmaster = await Taxmaster.findByIdAndUpdate(
		req.body._id,
		{
			outlet: req.body.outlet,
			taxname: req.body.taxname,
			appfrom: req.body.appfrom,
			appto: req.body.appto,
			rate: req.body.rate,
		},
		{ new: true }
	);
	if (!taxmaster) return res.status(404).send("The Taxmaster was not found.");
	res.send(taxmaster);
});

router.delete("/", async (req, res) => {
	// const role = await Role.findOne({permissions: req.body._id});
	// if (role) return res.status(404).send('The Role with this Permission Exists. Cannot Delete');
	const taxmaster = await Taxmaster.findByIdAndRemove(req.body._id);
	if (!taxmaster) return res.status(404).send("The Taxmaster was not found.");
	res.send(taxmaster);
});

router.get("/all", async (req, res) => {
	const taxes = await Taxmaster.find().sort({ _id: 1 });
	res.send(taxes);
});

router.get("/:nm", async (req, res) => {
	const taxmaster = await Taxmaster.find({ _id: req.params.nm });
	if (!taxmaster) return res.status(404).send("The taxmaster was not found.");
	res.send(taxmaster);
});

module.exports = router;
