// importing 
const router = require('express').Router();
//making router
const productControllers = require('../controllers/productControllers.js');
const { authGuardAdmin, authGuard } = require('../middleware/authGuard.js');

// exporting router
router.post('/createProduct',authGuardAdmin,productControllers.createProduct);
router.get('/getProduct',productControllers.getProducts);
router.get('/get-product/:productId',productControllers.getSingleProduct);
router.put('/edit-product/:productId',productControllers.editProduct);
router.delete('/deleteProduct/:productId', authGuard, productControllers.deleteProduct);//deleteroute for products
module.exports = router;
