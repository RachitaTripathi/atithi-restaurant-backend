const Joi = require("joi");
const mongoose = require("mongoose");

const settlementModeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

const SettlementMode = mongoose.model("SettlementMode", settlementModeSchema);

function validateSettlementMode(sm) {
	const schema = {
		name: Joi.string().required(),
	};

	return Joi.validate(sm, schema);
}
exports.settlementModeSchema = settlementModeSchema;
exports.settlementMode = SettlementMode;
exports.validate = validateSettlementMode;
