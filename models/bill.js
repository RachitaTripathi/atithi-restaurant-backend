const Joi = require("joi");
const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
	billno: {
		type: Number,
		required: true,
		unique: true,
	},
	billdate: {
		type: Date,
		required: true,
	},
	outlet: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Outlet",
		required: true,
	},
	orders: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
		required: true,
	},
	grossamt: {
		type: Number,
	},
	discpercent: {
		type: Number,
	},
	discamount: {
		type: Number,
	},
	tax: [
		{
			taxId: { type: mongoose.Schema.Types.ObjectId, ref: "Taxmaster" },
			amount: { type: Number },
		},
	],
	roundoff: { type: Number },
	netamt: { type: Number },
	guest: {
		gname: { type: String },
		gstin: { type: String },
		address: { type: String },
		contact: { type: Number },
	},
	billstatus: {
		type: String,
		required: true,
	},
	settlement: [
		{
			mode: { type: mongoose.Types.ObjectId, ref: "SettlementMode" },
			description: { type: String },
			amount: { type: Number },
		},
	],
});

const Bill = mongoose.model("Bill", billSchema);

function validateBill(bill) {
	const schema = {
		name: Joi.string().required(),
	};

	return Joi.validate(bill, schema);
}
exports.billSchema = billSchema;
exports.Bill = Bill;
exports.validate = validateBill;
