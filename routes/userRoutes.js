const router = require('express').Router();
const userController = require('../controllers/userControllers');

router.post('/create', userController.create);
router.post('/login',userController.login)

module.exports = router;