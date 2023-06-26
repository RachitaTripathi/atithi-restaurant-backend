const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Order, validate } = require("../models/order");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	let order = new Order({
		orderno: req.body.orderno,
		orderdate: req.body.orderdate,
		outlet: req.body.outlet,
		steward: req.body.steward,
		table: req.body.table,
		items: req.body.items,
		guest: req.body.guest,
		billno: req.body.billno,
		orderstatus: req.body.orderstatus,
	});
	order = await order.save();
	res.send(order);
});

router.put("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	const order = await Order.findByIdAndUpdate(
		req.body._id,
		{
			orderno: req.body.orderno,
			orderdate: req.body.orderdate,
			outlet: req.body.outlet,
			steward: req.body.steward,
			table: req.body.table,
			items: req.body.items,
			guest: req.body.guest,
			billno: req.body.billno,
			orderstatus: req.body.orderstatus,
		},
		{ new: true }
	);
	if (!order) return res.status(404).send("The Order was not found.");
	res.send(order);
});

router.delete("/", async (req, res) => {
	// const role = await Role.findOne({permissions: req.body._id});
	// if (role) return res.status(404).send('The Role with this Permission Exists. Cannot Delete');
	const order = await Order.findByIdAndRemove(req.body._id);
	if (!order) return res.status(404).send("The Order was not found.");
	res.send(order);
});

router.get("/all", async (req, res) => {
	const orders = await Order.find().sort({ orderno: 1 });
	res.send(orders);
});

router.get("/:nm", async (req, res) => {
	const order = await Order.find({ orderno: req.params.nm });
	if (!order) return res.status(404).send("The order was not found.");
	res.send(order);
});

module.exports = router;
