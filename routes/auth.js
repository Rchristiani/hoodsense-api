'use strict';

const UserModel = require('../models/user');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const config = require('../config');

app.set('superSecret', config.secret);

const auth = {};

auth.secure = (req, res) => {
	UserModel.findOne({
		username: req.body.username
	}, (err, user) => {

		if (err)
			throw err;
		// Check if username exists
		if (!user) {
			res.json({success: false, message: 'Username not found'});
		} else if (user) {
			
			// Check if password is correct
			if (user.password != req.body.password) {
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