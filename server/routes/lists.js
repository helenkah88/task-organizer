var router = require('express').Router();
var listsCtrl = require('../controllers/lists.controller');

// find a single TODO list within a single category
router.get('/:listId', listsCtrl.getSingle);

// create a new TODO list
router.post('', listsCtrl.create);

// add new item to list
router.post('/:listId', listsCtrl.addItem);

// update TODO list
router.put('/:id', listsCtrl.update);

//delete TODO list
router.delete('/:listId', listsCtrl.remove)

// delete a single item on a TODO list
router.delete('/:listId/:id', listsCtrl.removeItem);

module.exports = router;