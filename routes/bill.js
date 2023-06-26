const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Bill, validate } = require("../models/bill");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	let bill = new Bill({
		billno: req.body.billno,
		billdate: req.body.billdate,
		outlet: req.body.outlet,
		orders: req.body.orders,
		grossamt: req.body.grossamt,
		discpercent: req.body.discpercent,
		discamount: req.body.discamount,
		tax: req.body.tax,
		roundoff: req.body.roundoff,
		netamt: req.body.netamt,
		guest: req.body.guest,
		billstatus: req.body.billstatus,
		settlement: req.body.settlement,
	});
	bill = await bill.save();
	res.send(bill);
});

router.put("/", async (req, res) => {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	const bill = await Bill.findByIdAndUpdate(
		req.body._id,
		{
			billno: req.body.billno,
			billdate: req.body.billdate,
			outlet: req.body.outlet,
			orders: req.body.orders,
			grossamt: req.body.grossamt,
			discpercent: req.body.discpercent,
			discamount: req.body.discamount,
			tax: req.body.tax,
			roundoff: req.body.roundoff,
			netamt: req.body.netamt,
			guest: req.body.guest,
			billstatus: req.body.billstatus,
			settlement: req.body.settlement,
		},
		{ new: true }
	);
	if (!bill) return res.status(404).send("The Bill was not found.");
	res.send(bill);
});

router.delete("/", async (req, res) => {
	// const role = await Role.findOne({permissions: req.body._id});
	// if (role) return res.status(404).send('The Role with this Permission Exists. Cannot Delete');
	const bill = await Bill.findByIdAndRemove(req.body._id);
	if (!bill) return res.status(404).send("The Bill was not found.");
	res.send(bill);
});

router.get("/all", async (req, res) => {
	const bills = await Bill.find().sort({ billno: 1 });
	res.send(bills);
});

router.get("/:nm", async (req, res) => {
	const bill = await Bill.find({ billno: req.params.nm });
	if (!bill) return res.status(404).send("The bill was not found.");
	res.send(bill);
});

module.exports = router;
