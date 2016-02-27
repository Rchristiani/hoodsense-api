'use strict'
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

module.exports = Mongoose.model('Unit', new Schema({
	title: String,
	city: { type: String, lowercase: true },
	country: { type: String, lowercase: true },
	description: String
}))