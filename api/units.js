'use strict';

const UnitModel = require('./models/unit'); 
const units = {};

// View all units
// api/units
// 
units.all = (req, res) => {
	UnitModel.find({}, (err, data) => {
		res.json(data);
	}).limit(5);
}

// Add new unit
// api/units?title={String}&city={String}&country={String}&description={String}
// 
units.addNew = (req, res) => {
	console.log(req.body)
	var record = new UnitModel(req.body);
	record.save(err => {
		if (err) {
			res.send(err);
		} else {
			res.json({message: 'Unit added successfully'});
		}
	})
}

module.exports = units;