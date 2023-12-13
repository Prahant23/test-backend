// import express
const router = require('express').Router();
// import the userControllers
const userControllers = require('../controller/userController');
// create a router .. all routes for the user
router.post('/create', userControllers.createUser);
router.post('/login', userControllers.loginUser);

// export the router
module.exports = router;

// all the routes for the user