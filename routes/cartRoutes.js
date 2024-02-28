const express = require("express");
const cartRoute = express.Router();///Use Router for route creation
const bodyParser = require("body-parser");
cartRoute.use(bodyParser.json());
cartRoute.use(bodyParser.urlencoded({ extended: true }));

const {authGuard }= require("../middleware/authGuard"); // Destructuring to get authGuard
const {addtocart} = require("../controllers/cartController")

// Existing route for adding to cart
cartRoute.post("/addtocart", authGuard,addtocart);

module.exports = cartRoute;