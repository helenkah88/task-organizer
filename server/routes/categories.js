var router = require('express').Router();
var categoriesCtrl = require('../controllers/categories.controller');

// find all categories
router.get('/:user_id', categoriesCtrl.getAll);

// create new category
router.post('/', categoriesCtrl.create);

// update category
router.put('/:id', categoriesCtrl.update);

// delete a category
router.delete('/:id', categoriesCtrl.remove);

module.exports = router;