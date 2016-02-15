'use strict';

const express = require('express');
const app = express();
let router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');

let port = process.env.port || 3200;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('superSecret', config.secret);

app.use(morgan('dev'));

/*================================================================
=            JSON Web Token Authentication Middleware            =
================================================================*/
router.use( (req, res, next) => {
	console.log('running')
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

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
});

/*===============================
=            Routing            =
===============================*/

/*----------  Import Routes  ----------*/

const Setup = require('./api/setup');
const Auth = require('./api/auth');
const User = require('./api/users');
const Units = require('./api/units');

/*----------  Define Routes  ----------*/
app.get('/', (req, res) => { res.send('Authenticate!')} );
router.get('/setup', Setup.main); 
router.get('/users', User.all);
router.get('/units', Units.all);
router.post('/units', Units.addNew);
router.post('/authenticate', Auth.secure);
app.use('/api', router);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);