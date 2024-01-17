// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers.js');
const authMiddleware  = require('../middlewares/checkAdmin');
// Create a new category
router.post('/createCategory',authMiddleware, categoryController.createCategory);

// Get all categories
router.get('/get_categories',categoryController.getAllCategories);

// Update a category
router.put('/update_category/:id',authMiddleware, categoryController.updateCategory);

// Delete a category
router.delete('/delete_categories/:id',authMiddleware, categoryController.deleteCategory);

module.exports = router;
