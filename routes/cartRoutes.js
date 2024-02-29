const express = require("express");
const cartRoute = express.Router();
const bodyParser = require("body-parser");


// const { authGuard } = require("../middleware/authGuard");
const { addtocart } = require("../controllers/cartController");
cartRoute.use(bodyParser.json());
cartRoute.use(bodyParser.urlencoded({ extended: true }));

// Route for adding to cart
cartRoute.post("/addtocart", addtocart);

module.exports = cartRoute;
