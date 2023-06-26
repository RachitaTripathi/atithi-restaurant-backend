const Joi = require("joi");
const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
	tableno: {
		type: Number,
		required: true,
		unique: true,
	},
	status: {
		type: String,
		required: true,
	},
});

const Table = mongoose.model("Table", tableSchema);

function validateTable(table) {
	const schema = {
		name: Joi.string().required(),
	};

	return Joi.validate(table, schema);
}
exports.tableSchema = tableSchema;
exports.Table = Table;
exports.validate = validateTable;
