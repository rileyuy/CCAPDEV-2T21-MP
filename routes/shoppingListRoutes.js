const express = require('express')
const shoppingListController = require('../controllers/shoppingListController')

const router = express.Router();

router.put ('', shoppingListController.addOne_shoppingList);
router.get ('', shoppingListController.deleteOne_shoppingList);

module.exports = router;