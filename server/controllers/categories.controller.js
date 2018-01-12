var categories = require('../models/categories');

module.exports.getAll = function(req, res) {
    categories.find({userId: req.params.user_id}).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    })
};

module.exports.create = function(req, res) {
    categories.create(req.body).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    })
};

module.exports.update = function(req, res) {
    categories.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(data) {
        res.json();
    }).catch(function(e) {
        console.log(e);
    });
};

module.exports.remove = function(req, res) {
    categories.findByIdAndRemove(req.params.id).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    })
};