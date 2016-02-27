'use strict';

const UserModel = require('../models/user');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const config = require('../config');
const bCrypt = require('bcrypt-nodejs');

app.set('superSecret', config.secret);

const auth = {};

var createHash = function(password){
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var isValidPassword = function(user, password){
	return bCrypt.compareSync(password, user.password);
}

auth.signup = (req, res) => {
	UserModel.findOne({ username: req.body.username }, (err, user) => {
		if (err) throw err;
		
		if(user) {
			console.log('exists');
			res.json({success: false, message: 'Username is taken!'})
		} else {
			let model = new UserModel({
				username: req.body.username,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: createHash(req.body.password),
				admin: false
			});
			model.save( (err, data) => {
				if (err) throw err;
				res.json({
					success: true,
					message: 'Signed Up!'
				});
			});
		}
	})

}

auth.login = (req, res) => {
	UserModel.findOne({ username: req.body.username }, (err, user) => {
		if (err) throw err;
		// Check if username exists
		if (!user) {
			res.json({success: false, message: 'Username not found'});
		} else if (user) {
			
			// Check if password is correct
			// if (user.password != req.body.password) {
			if (!isValidPassword(user, req.body.password)) {
				res.json({success: false, message: 'Incorrect Password!'});
			} else {

				// Create webtoken and give it to user
				let token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: '7d'
				});

				res.json({
					success: true,
					message: 'User Authenticated!',
					token: token
				});
			};
		};
	});
}

module.exports = auth;