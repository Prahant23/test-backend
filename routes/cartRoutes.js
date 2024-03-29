const router = require('express').Router();
const bodyParser = require("body-parser");
const auth = require("../middleware/authGuard");
const cartController=require("../controllers/cartController")

// Parse incoming request bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Define the route to add item to cart
router.route('/addtocart').post(auth.authGuard, cartController.addtocart);
router.route('/').get(auth.authGuard, cartController.getCartItems);
// DELETE request to delete a cart item by ID
router.delete('/delete/:id', cartController.deleteCartItem);//delete routes for cart




module.exports = router;