// userRoutes.js
const router = require('express').Router();
const userController = require('../controllers/userControllers');

router.post('/create', userController.create);
router.post('/login', userController.login);
router.route("/forgot/password").post(userController.forgotPassword);
router.route("/password/reset/:token").put(userController.resetPassword);

module.exports = router;
