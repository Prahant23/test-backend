const express = require("express");
const cartroute = express();
const bodyparser = require("body-parser");
cartroute.use(bodyparser.json());
cartroute.use(bodyparser.urlencoded({extended:true}));


const auth =  require("../middleware/authGuard");

const cartcontroller = require("../controllers/cartController");

// cartroute.post("/addtocart",auth, cartcontroller.addtocart);

module.exports = cartroute;