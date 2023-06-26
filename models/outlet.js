const Joi = require("joi");
const mongoose = require("mongoose");

const outletSchema = new mongoose.Schema({
	outletname: {
		type: String,
		required: true,
		unique: true,
	},
	lastbillno: {
		type: String,
		required: true,
	},
	lastorderno: {
		type: String,
		required: true,
	},
});

const Outlet = mongoose.model("Outlet", outletSchema);

function validateOutlet(table) {
	const schema = {
		name: Joi.string().required(),
	};

	return Joi.validate(table, schema);
}
exports.outletSchema = outletSchema;
exports.Outlet = Outlet;
exports.validate = validateOutlet;
