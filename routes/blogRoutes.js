const express = require('express');
const blogController = require('../controllers/blogController.js')
const {requireAuth} = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/', blogController.blogIndex);

router.post('/', blogController.blogCreatePost);

router.get('/create', requireAuth, blogController.blogCreateGet);

router.get('/:id', blogController.blogDetails);

router.delete('/:id', blogController.blogDelete);

module.exports = router;