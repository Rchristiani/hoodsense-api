'use strict'
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

module.exports = Mongoose.model('User', new Schema({
	username: String,
	firstname: String,
	lastname: String,
	email: String,
	password: String,
	admin: Boolean
}));