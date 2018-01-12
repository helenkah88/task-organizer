var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    userId: {
        type:  Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Category = mongoose.model('category', CategorySchema);

module.exports = Category;