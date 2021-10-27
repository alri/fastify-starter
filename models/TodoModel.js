const mongoose = requiree("/config/database.js");

const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const timestamps = require('mongoose-timestamp');
const { autoIncrement } = require('mongoose-plugin-autoinc');


const todoSchema = new mongoose.Schema( {
    content: { 
        type: mongoose.SchemaTypes.String, 
        required: true,
        unique: true
        },
});

todoSchema.plugin(uniqueValidator);
todoSchema.plugin(mongoosePaginate);
todoSchema.plugin(timestamps);
todoSchema.plugin(autoIncrement,{ model: 'todos', field: 'id',startAt: 1, });


const Todo = mongoose.model('Todo', todoSchema);
//--automatic create todos document in db

module.exports = Todo