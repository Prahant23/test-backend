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
// router.route('/addtocart').post(cartController.addtocart);
// router.post("/addtocart",auth, cartController.addtocart);



module.exports = router;