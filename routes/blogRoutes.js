const express = require('express');
const blogController = require('../controllers/blogController.js')
const authController = require('../controllers/authController.js')

const router = express.Router();

router.get('/', blogController.blogIndex);

router.post('/', blogController.blogCreatePost);

router.get('/create', blogController.blogCreateGet);

router.get('/:id', blogController.blogDetails);

router.delete('/:id', blogController.blogDelete);

module.exports = router;