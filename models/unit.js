'use strict'
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

module.exports = Mongoose.model('Unit', new Schema({
	title: String,
	city: { type: String, lowercase: true },
	country: { type: String, lowercase: true },
	description: String,
	streetNumber: String,
	aptNumber: String,
	city: String,
	stateProvince: String,
	country: String,
	postal_zip: String,
	hydro_included: Boolean,
	water_included: Boolean,
	gas_included: Boolean,
	hydro_cost: Number,
	water_cost: Number,
	gas_cost: Number,
	pet_friendly: Boolean,
	outdoor_space: Boolean,
	leaks: Boolean,
	mice: Boolean,
	bedbugs: Boolean,
	updated: { type: Date, default: Date.now }
}))