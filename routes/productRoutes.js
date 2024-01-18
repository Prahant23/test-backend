// importing 
const router = require('express').Router();
//making router
const productControllers = require('../controllers/productControllers.js');
const { authGuardAdmin } = require('../middleware/authGuard.js');

// exporting router
router.post('/createProduct',authGuardAdmin,productControllers.createProduct);
module.exports = router;
