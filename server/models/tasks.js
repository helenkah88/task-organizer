var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: String,
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = TaskSchema;