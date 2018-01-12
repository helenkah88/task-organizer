var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var loginCtrl = require('./controllers/auth.controller')
var goalCtrl = require('./controllers/goal.controller')
var lists = require('./models/lists');
var categoryRoutes = require('./routes/categories');
var listRoutes = require('./routes/lists');

require('./passport_config');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/todoapp', { useMongoClient: true }).then(function() {
    console.log('connected');
}).catch(function(e) {
    console.log(e);
});

var rootPath = path.normalize(__dirname + '/../');
app.use(express.static(rootPath + 'app'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// check auth
app.use(passport.initialize());
app.use('/api', passport.authenticate('jwt', {session: false}));

app.use('/api/categories', categoryRoutes);
app.use('/api/lists', listRoutes);


// auth
app.post('/login', loginCtrl);

//get goal
app.get('/api/:id/goal', goalCtrl.getGoal);
app.post('/api/:id/goal', goalCtrl.setGoal);


// find all TODO lists
app.get('/api/:user_id/lists', function(req, res) {
    lists.find({userId: req.params.user_id, 'archieved': false}).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    })
});


// find archieved TODO lists
app.get('/api/:user_id/lists/archieve', function(req, res) {
    lists.find({userId: req.params.user_id, 'archieved': true}).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    })
});

// find all TODO lists within a single category
app.get('/api/:user_id/:id/lists', function(req, res) {
    lists.find({categoryId: req.params.id, 'archieved': false}).then(function(data) {
        res.json(data);
    }).catch(function(e) {
        console.log(e);
    })
});

app.listen(8000);