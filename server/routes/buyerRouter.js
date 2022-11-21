const router = require('express').Router();
const buyerController = require('../controllers/buyerController');
const auth = require('../middleware/auth');

router.post('/buyerregister', buyerController.regsiter);

router.post('/buyerlogin', buyerController.login);

router.get('/buyerlogout', buyerController.logout);

router.get('/refresh_token', buyerController.refreshToken);

router.get('/infor', auth, buyerController.getBuyer);

router.patch('/addcart', auth, buyerController.addCart);

module.exports = router;