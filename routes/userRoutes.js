// import express
const router = require('express').Router();
// import the userControllers
const userControllers = require('../controllers/userControllers');
const productControllers = require('../controllers/productControllers');
// create a router .. all routes for the user
router.post('/create', userControllers.createUser);
router.post('/login', userControllers.loginUser);
router.get('/createProduct', productControllers.createProduct);
// export the router
module.exports = router;

// all the routes for the user