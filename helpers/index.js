const express = require('express');
const app = express();
const config = require('../config');
app.set('superSecret', config.secret);
const jwt = require('jsonwebtoken');

module.exports = {

	// Check Token
	authCheck: (req, res, next) => {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];
		console.log(token);
		if (token) {
			jwt.verify(token, app.get('superSecret'), (err, decoded) => {
				if (err) {
					return res.json({success: false, message: 'Failed to authenticate token'});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided'
			});
		}
	}
	
}