'use strict';
const User = require('./models/user');
const setup = {};

setup.main = (req, res) => {
	const testUser = new User({
		username: 'Drew Minns',
		password: 'password',
		admin: true
	});

	testUser.save(err => {
		if (err) throw err;
		console.log('Saved Successfully');
		res.json({success: true});
	});
}

module.exports = setup;

