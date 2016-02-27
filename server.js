'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const h = require('./helpers');
const config = require('./config');
let port = process.env.port || 3200;

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

const Auth = require('./routes/auth');
const User = require('./routes/users');
const Units = require('./routes/units');

app.get('/', (req, res) => { res.send({message: 'You need to authenticate!'})} );
app.post('/api/signup', Auth.signup);
app.post('/api/authenticate', Auth.login);
app.get('/api/users', h.authCheck, User.all);
app.get('/api/units', h.authCheck, Units.all);
app.post('/api/units', h.authCheck, Units.addNew);

app.listen(port);