const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Category, validate } = require("../models/category");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	let category = new Category({
		name: req.body.name,
	});
	category = await category.save();
	res.send(category);
});

router.put("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	const category = await Category.findByIdAndUpdate(
		req.body._id,
		{
			name: req.body.name,
		},
		{ new: true }
	);
	if (!category) return res.status(404).send("The Category was not found.");
	res.send(category);
});

router.delete("/", async (req, res) => {
	// const role = await Role.findOne({permissions: req.body._id});
	// if (role) return res.status(404).send('The Role with this Permission Exists. Cannot Delete');
	const category = await Category.findByIdAndRemove(req.body._id);
	if (!category) return res.status(404).send("The Category was not found.");
	res.send(category);
});

router.get("/all", async (req, res) => {
	const categories = await Category.find().sort({ _id: 1 });
	res.send(categories);
});

router.get("/:nm", async (req, res) => {
	const category = await Category.find({ _id: req.params.nm });
	if (!category) return res.status(404).send("The category was not found.");
	res.send(category);
});

module.exports = router;
