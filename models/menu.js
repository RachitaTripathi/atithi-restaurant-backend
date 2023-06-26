const Joi = require("joi");
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
	menuitemname: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
		unique: true,
	},
	category: {
		type: String,
		required: true,
	},
	rate: {
		type: [
			{
				outlet: { type: mongoose.Schema.Types.ObjectId, ref: "Outlet" },
				rate: Number,
				vatrate: Number,
			},
		],
		required: true,
	},
});

const Menu = mongoose.model("Menu", tableSchema);

function validateMenu(menu) {
	const schema = {
		name: Joi.string().required(),
	};

	return Joi.validate(menu, schema);
}
exports.menuSchema = menuSchema;
exports.Menu = Menu;
exports.validate = validateMenu;
