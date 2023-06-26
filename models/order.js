const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	orderno: {
		type: Number,
		required: true,
		unique: true,
	},
	orderdate: {
		type: Date,
		required: true,
	},
	outlet: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Outlet",
		required: true,
	},
	steward: {
		type: String,
	},
	table: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Table",
		required: true,
	},
	items: [
		{
			menuitemname: { type: String, required: true },
			quantity: { type: Number, required: true },
			specialInst: { type: String },
			rate: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
			amount: { type: Number },
		},
	],
	guest: {
		gname: { type: String },
		gstin: { type: String },
		address: { type: String },
		contact: { type: Number },
	},
	billno: {
		type: Number,
		required: true,
	},
	orderstatus: {
		type: String,
		required: true,
	},
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
	const schema = {
		name: Joi.string().required(),
	};

	return Joi.validate(order, schema);
}
exports.orderSchema = orderSchema;
exports.Order = Order;
exports.validate = validateOrder;
