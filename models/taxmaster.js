const Joi = require("joi");
const mongoose = require("mongoose");

const taxmasterSchema = new mongoose.Schema({
	outlet: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Outlet",
		required: true,
	},
	taxname: {
		type: String,
		required: true,
		unique: true,
	},
	appfrom: {
		type: Date,
		required: true,
	},
	appto: {
		type: Date,
		required: true,
	},
	rate: {
		type: Number,
		required: true,
	},
});

const Taxmaster = mongoose.model("Taxmaster", outletSchema);

function validateTaxmaster(tm) {
	const schema = {
		name: Joi.string().required(),
	};

	return Joi.validate(tm, schema);
}
exports.TaxmasterSchema = taxmasterSchema;
exports.Taxmaster = Taxmaster;
exports.validate = validateTaxmaster;
