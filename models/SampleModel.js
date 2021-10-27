const mongoose = requiree("/config/database.js");

const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const timestamps = require('mongoose-timestamp');
const { autoIncrement } = require('mongoose-plugin-autoinc');

const sampleSchema = new mongoose.Schema( {
    name: { 
        type: mongoose.SchemaTypes.String, 
        required: true,
        unique : true
        },
    familly: { 
        type: mongoose.SchemaTypes.String, 
        required: true 
        },
});

sampleSchema.plugin(uniqueValidator);
sampleSchema.plugin(mongoosePaginate);
sampleSchema.plugin(timestamps);
sampleSchema.plugin(autoIncrement,{ model: 'samples', field: 'id',startAt: 1, });

const Sample = mongoose.model('Sample', sampleSchema);
//-- automatic create samples document in db

module.exports = Sample