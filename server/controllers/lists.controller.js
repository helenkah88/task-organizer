var lists = require('../models/lists');

module.exports.getSingle = function(req, res) {
    lists.findOne({_id: req.params.listId, archieved: false}).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    })
};

module.exports.create = function(req, res) {
    lists.create(req.body).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    });
};

module.exports.update = function(req, res) {
    lists.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(data) {
        res.json();
    }).catch(function(e) {
        console.log(e);
    });
};

module.exports.remove = function(req, res) {
    lists.findByIdAndRemove({ _id: req.params.listId }).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    });
};

module.exports.addItem = function(req, res) {
    lists.findByIdAndUpdate({ _id: req.params.listId }, { $push: { items: req.body } }, { new: true }).then(function(data) {
        res.json(data.items[data.items.length - 1]);
    }).catch(function(e) {
        console.log(e);
    });
};

module.exports.removeItem = function(req, res) {
    lists.update({ _id: req.params.listId }, { $pull: { items: { _id: req.params.id } } }).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    })
};