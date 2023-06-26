const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Outlet, validate } = require("../models/outlet");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	let outlet = new Outlet({
		outletname: req.body.outletname,
		lastbillno: req.body.lastbillno,
		lastorderno: req.body.lastorderno,
	});
	outlet = await outlet.save();
	res.send(outlet);
});

router.put("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	const outlet = await Outlet.findByIdAndUpdate(
		req.body._id,
		{
			outletname: req.body.outletname,
			lastbillno: req.body.lastbillno,
			lastorderno: req.body.lastorderno,
		},
		{ new: true }
	);
	if (!outlet) return res.status(404).send("The Outlet was not found.");
	res.send(outlet);
});

router.delete("/", async (req, res) => {
	// const role = await Role.findOne({permissions: req.body._id});
	// if (role) return res.status(404).send('The Role with this Permission Exists. Cannot Delete');
	const outlet = await Outlet.findByIdAndRemove(req.body._id);
	if (!outlet) return res.status(404).send("The Outlet was not found.");
	res.send(outlet);
});

router.get("/all", async (req, res) => {
	const outlets = await Outlet.find().sort({ _id: 1 });
	res.send(outlets);
});

router.get("/:nm", async (req, res) => {
	const outlet = await Outlet.find({ _id: req.params.nm });
	if (!outlet) return res.status(404).send("The outlet was not found.");
	res.send(outlet);
});

module.exports = router;
