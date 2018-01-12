var mongoose = require('mongoose');
var Task = require('./tasks');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
    title: {
        type: String
    },
    items: {
        type: [Task]
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    categoryId: {
        type:  Schema.Types.ObjectId,
        ref: 'Category'
    },
    archieved: {
        type: Boolean,
        default: false
    },
    userId: {
        type:  Schema.Types.ObjectId,
        ref: 'User'
    }
});

var List = mongoose.model('list', ListSchema);
module.exports = List;