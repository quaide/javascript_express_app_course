const express = require('express');
const blogController = require('../controllers/blogController.js')
const authController = require('../controllers/authController.js')

const router = express.Router();

router.get('/', blogController.blogIndex);

router.post('/', blogController.blogCreatePost);

router.get('/create', blogController.blogCreateGet);

router.get('/:id', blogController.blogDetails);

router.delete('/:id', blogController.blogDelete);

// router.get('/signup', authController.signupGet);

// router.post('/signup', authController.signupPost);

// router.get('/login', authController.loginGet);

// router.post('/login', authController.loginPost);

// router.get('/logout', authController.logoutGet);

module.exports = router;