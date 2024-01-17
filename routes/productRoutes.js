// importing 
const router = require('express').Router();
//making router
const productControllers = require('../controllers/productControllers.js')
//routes
router.post('/createProduct', productControllers.createProduct);
// exporting router
module.exports = router;
