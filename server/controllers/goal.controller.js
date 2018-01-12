var users = require('../models/users');

module.exports.getGoal = function(req, res) {
    users.findById(req.params.id).then(function(user) {
        if(user) {
            res.json({goal: user.goal});
        }
    }).catch(function(e) {
        console.log(e);
    })
};

module.exports.setGoal = function(req, res) {
    users.findByIdAndUpdate({ _id: req.params.id}, {$set: {goal: req.body.goal}}, {upsert: true}).then(function() {
        res.json({message: 'success'});
    }).catch(function(e) {
        console.log(e);
    })
};