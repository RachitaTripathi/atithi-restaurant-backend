const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Menu, validate } = require("../models/menu");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	let menu = new Menu({
		menuitemname: req.body.menuitemname,
		description: req.body.description,
		category: req.body.category,
		rate: req.body.rate,
	});
	menu = await menu.save();
	res.send(menu);
});

router.put("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	const menu = await Menu.findByIdAndUpdate(
		req.body._id,
		{
			menuitemname: req.body.menuitemname,
			description: req.body.description,
			category: req.body.category,
			rate: req.body.rate,
		},
		{ new: true }
	);
	if (!menu) return res.status(404).send("The Menu was not found.");
	res.send(menu);
});

router.delete("/", async (req, res) => {
	// const role = await Role.findOne({permissions: req.body._id});
	// if (role) return res.status(404).send('The Role with this Permission Exists. Cannot Delete');
	const menu = await Menu.findByIdAndRemove(req.body._id);
	if (!menu) return res.status(404).send("The Menu was not found.");
	res.send(menu);
});

router.get("/all", async (req, res) => {
	const menus = await Menu.find().sort({ _id: 1 });
	res.send(menus);
});

router.get("/:nm", async (req, res) => {
	const menu = await Menu.find({ _id: req.params.nm });
	if (!menu) return res.status(404).send("The menu was not found.");
	res.send(menu);
});

module.exports = router;
