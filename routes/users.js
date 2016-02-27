'use strict';

const UserModel = require('../models/user');
const users = {};

/*----------  api/users - GET  ----------*/
users.all = (req, res) => {
	UserModel.find({}, (err, users) => {
		res.json(users);
	});
};

module.exports = users;