const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/signup', authController.signupGet);

router.post('/signup', authController.signupPost);

router.get('/login', authController.loginGet);

router.post('/login', authController.loginPost);

router.get('/logout', authController.logoutGet);

router.get('/account', requireAuth, authController.accountGet);

router.put('/account/:id', requireAuth, authController.accountPut);


module.exports = router;